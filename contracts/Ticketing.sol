// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IZKPVerifier {
    function verifyProof(bytes calldata proof, uint256[3] calldata publicSignals) external view returns (bool);
}

contract Ticketing is ERC721, Ownable {
    uint256 public constant MIN_PRICE = 10 ether;
    uint256 public constant MAX_PRICE = 50 ether;
    struct EventInfo {
        string name;
        uint256 price;
        uint256 remaining;
    }

    IERC20 public immutable bdag;
    IZKPVerifier public verifier;
    uint256 public nextEventId;
    uint256 public nextTicketId;

    mapping(uint256 => EventInfo) public events;
    mapping(uint256 => uint256) public ticketEvent;

    constructor(address bdagToken, address proofVerifier) ERC721("ZK-Tix", "ZKTIX") {
        bdag = IERC20(bdagToken);
        verifier = IZKPVerifier(proofVerifier);
    }

    function createEvent(string calldata name, uint256 price, uint256 tickets) external onlyOwner {
        require(price >= MIN_PRICE && price <= MAX_PRICE, "Price out of range");
        events[nextEventId] = EventInfo(name, price, tickets);
        nextEventId++;
    }

    function getEvents() external view returns (EventInfo[] memory evs) {
        evs = new EventInfo[](nextEventId);
        for (uint256 i = 0; i < nextEventId; i++) {
            evs[i] = events[i];
        }
    }

    function buyTicket(uint256 eventId) external {
        EventInfo storage ev = events[eventId];
        require(ev.remaining > 0, "Sold out");
        require(ev.price >= MIN_PRICE && ev.price <= MAX_PRICE, "Invalid ticket price");
        ev.remaining -= 1;
        require(bdag.transferFrom(msg.sender, owner(), ev.price), "Payment failed");
        _mint(msg.sender, nextTicketId);
        ticketEvent[nextTicketId] = eventId;
        nextTicketId++;
    }

    function transferWithProof(uint256 ticketId, address to, bytes calldata proof) external {
        require(ownerOf(ticketId) == msg.sender, "Not owner");
        uint256[3] memory pubSignals = [uint256(ticketId), uint256(uint160(msg.sender)), uint256(uint160(to))];
        require(verifier.verifyProof(proof, pubSignals), "Invalid proof");
        _transfer(msg.sender, to, ticketId);
    }
}
