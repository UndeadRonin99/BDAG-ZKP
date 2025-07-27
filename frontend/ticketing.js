let provider;
let signer;
let contract;

const contractAddress = "0xYourContractAddress"; // replace with deployed address
const abi = [
    "function buyTicket(uint256 eventId) public",
    "function transferWithProof(uint256 ticketId, address to, bytes calldata proof) public",
    "function getEvents() public view returns(tuple(uint256 id,string name,uint256 price,uint256 remaining)[])"
];

async function init() {
    const buyBtn = document.getElementById('buyBtn');
    const transferBtn = document.getElementById('transferBtn');
    buyBtn.addEventListener('click', () => buyTicket(0));
    transferBtn.addEventListener('click', () => generateProofAndTransfer(0));
}

async function connectWallet() {
    if (!window.ethereum) {
        alert('MetaMask not detected');
        return;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    loadEvents();
}

async function loadEvents() {
    const events = await contract.getEvents();
    const container = document.getElementById('events');
    container.innerHTML = '';
    events.forEach(ev => {
        const div = document.createElement('div');
        div.innerHTML = `${ev.id}: ${ev.name} - Price: ${ev.price}`;
        container.appendChild(div);
    });
    document.getElementById('buySection').style.display = 'block';
}

async function buyTicket(eventId) {
    try {
        const tx = await contract.buyTicket(eventId);
        await tx.wait();
        alert('Ticket purchased!');
    } catch (err) {
        console.error(err);
        alert('Purchase failed');
    }
}

async function generateProofAndTransfer(ticketId) {
    const recipient = document.getElementById('recipient').value;
    if (!recipient) {
        alert('Enter recipient');
        return;
    }
    // TODO: integrate real ZKP generation with SnarkJS
    const proof = '0x00'; // placeholder
    try {
        const tx = await contract.transferWithProof(ticketId, recipient, proof);
        await tx.wait();
        alert('Transfer complete');
    } catch (err) {
        console.error(err);
        alert('Transfer failed');
    }
}
