// Contract Configuration
// ⚠️ IMPORTANT: Update this address after deploying your smart contract

export const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

// Network Configuration
export const NETWORK_CONFIG = {
  chainId: '0x7a69', // 31337 in hex (Hardhat local network)
  chainName: 'Hardhat Local',
  rpcUrl: 'http://127.0.0.1:8545',
  blockExplorer: 'http://localhost:8545'
}

// For Sepolia testnet, use:
// export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'
// export const NETWORK_CONFIG = {
//   chainId: '0xaa36a7', // 11155111 in hex
//   chainName: 'Sepolia',
//   rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
//   blockExplorer: 'https://sepolia.etherscan.io'
// }

// Instructions:
// 1. Deploy BlockMed.sol to your chosen network (Hardhat/Remix/Testnet)
// 2. Copy the deployed contract address
// 3. Replace CONTRACT_ADDRESS above with your deployed address
// 4. Update NETWORK_CONFIG if using a different network
