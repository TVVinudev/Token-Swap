# Token-Swap

## Overview
This project is a decentralized application (dApp) that integrates the following key features:
- Deployment of ERC20 tokens.
- Creation of a liquidity pool smart contract.

## Features
- **ERC20 Token Deployment**: A customizable ERC20 token with features such as name, symbol, and initial supply.
- **Liquidity Pool**: A smart contract to facilitate the addition of liquidity, token swaps, and liquidity removal.


## Tech Stack
- **Smart Contracts**: Solidity
- **Blockchain Platform**: Ethereum (Testnet/Mainnet)
- **Libraries and Tools**:
  - Ethers.js
  - Hardhat (for smart contract development)
  - OpenZeppelin (for ERC20 implementation)

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Metamask](https://metamask.io/) browser extension
- Ethereum testnet account with test ETH

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dapp-repo.git
   cd dapp-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   REACT_APP_INFURA_API_KEY=your_infura_api_key
   PRIVATE_KEY=your_ethereum_private_key
   ```

4. Compile and deploy smart contracts:
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

5. Start the frontend:
   ```bash
   npm start
   ```

6. Access the application:
   Open your browser and navigate to `http://localhost:3000`.

## Usage
1. Connect your wallet using Metamask.
2. Interact with the dApp to:
   - View your token balances.
   - Add or remove liquidity from the pool.
   - Swap tokens.

## Smart Contract Details
- **ERC20 Contract**: Implements OpenZeppelin's ERC20 standard.
- **Liquidity Pool Contract**: 
  - Allows users to provide liquidity.
  - Facilitates token swaps based on predefined formulas.
  - Includes fee mechanisms for liquidity providers.

## Testing
Run the following command to execute smart contract tests:
```bash
npx hardhat test
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- [OpenZeppelin](https://openzeppelin.com/) for the ERC20 implementation.
- [Hardhat](https://hardhat.org/) for simplifying Ethereum development.
- Community contributors for their support and feedback.
