# ZK-Tix: Private, Scalable BDAG Ticketing Platform

This repository contains a minimal prototype for a zero‑knowledge based event ticketing system built for the BlockDAG network.

## Components

- `frontend/index.html` – basic web page to connect a wallet, buy tickets and transfer them using proofs.
- `frontend/styles.css` – simple styling for the demo frontend.
- `frontend/ticketing.js` – interacts with the deployed smart contract and includes placeholders for ZKP generation.
- `contracts/Ticketing.sol` – Solidity contract implementing ticket minting and transfer with proof verification.
- `circuits/zkp_circuit.circom` – Circom circuit sketch enforcing simple human and anti‑resale rules.

The project is intentionally lightweight and focuses on demonstrating how ZK proofs could restrict ticket transfers without revealing user identities.
