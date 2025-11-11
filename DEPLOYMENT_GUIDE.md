# 🚀 BlockMed Deployment Guide

## Quick Start - Local Development

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Install Hardhat (for local blockchain)
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### Step 3: Start Local Blockchain
```bash
npx hardhat node
```
Keep this terminal running. You'll see 20 test accounts with private keys.

### Step 4: Deploy Contract (New Terminal)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**Output will show:**
```
✅ BlockMed contract deployed successfully!
📍 Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 5: Update Configuration
Copy the contract address from Step 4, then edit:

**File: `src/utils/config.js`**
```javascript
export const CONTRACT_ADDRESS = 'YOUR_ADDRESS_FROM_STEP_4'
```

### Step 6: Configure MetaMask
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Fill in:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

4. Import test account:
   - From the Hardhat node terminal, copy **Account #0 Private Key**
   - MetaMask → Click account icon → Import Account
   - Paste private key

### Step 7: Start Frontend
```bash
npm run dev
```

Visit http://localhost:3000 and test!

---

## 🌐 Deploying to Testnet (Sepolia)

### Prerequisites
- Get Sepolia ETH from [faucet](https://sepoliafaucet.com)
- Get Infura API key from [infura.io](https://infura.io)

### Step 1: Update hardhat.config.js
```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

### Step 2: Create .env file
```
INFURA_KEY=your_infura_project_id
PRIVATE_KEY=your_metamask_private_key
```

### Step 3: Deploy to Sepolia
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Step 4: Update config.js for Sepolia
```javascript
export const CONTRACT_ADDRESS = 'YOUR_SEPOLIA_CONTRACT_ADDRESS'

export const NETWORK_CONFIG = {
  chainId: '0xaa36a7',
  chainName: 'Sepolia',
  rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY',
  blockExplorer: 'https://sepolia.etherscan.io'
}
```

### Step 5: Switch MetaMask to Sepolia
1. MetaMask → Network dropdown
2. Select "Sepolia Test Network"
3. Ensure you have test ETH

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Contract address updated in `config.js`
- [ ] MetaMask connected to correct network
- [ ] Test account has ETH for gas
- [ ] Frontend runs without errors
- [ ] Can connect MetaMask
- [ ] Can create prescription
- [ ] Transaction confirms successfully
- [ ] QR code generates

---

## 🔍 Testing Smart Contract Directly

### Using Hardhat Console
```bash
npx hardhat console --network localhost
```

Then run:
```javascript
const BlockMed = await ethers.getContractFactory("BlockMed");
const contract = await BlockMed.attach("YOUR_CONTRACT_ADDRESS");

// Add prescription
const tx = await contract.addPrescription("patient123", "QmHash123");
await tx.wait();

// Get prescription
const prescription = await contract.getPrescription(1);
console.log(prescription);

// Check count
const count = await contract.prescriptionCount();
console.log("Total prescriptions:", count.toString());
```

---

## 🐛 Common Issues

### "Error: Invalid contract address"
- Verify contract is deployed
- Check address in `config.js` matches deployed address
- Ensure no extra spaces/characters

### "Transaction Failed"
- Insufficient gas/ETH in wallet
- Wrong network selected in MetaMask
- Contract not deployed on current network

### "MetaMask not detected"
- Install MetaMask extension
- Refresh page after installation

### "Network mismatch"
- Switch MetaMask to same network as deployment
- For local: Chain ID 31337
- For Sepolia: Chain ID 11155111

---

## 📱 Testing QR Code

### With Phone Camera
1. Create prescription
2. Point phone camera at QR code
3. Should see: `Prescription: hash123 | IPFS: QmXyz...`

### With QR Scanner App
- Download any QR scanner
- Scan code after prescription creation
- Verify data matches input

---

## 🎯 Ready for Demo

**Pre-Demo Checklist:**
- [ ] Contract deployed and verified
- [ ] Frontend runs smoothly
- [ ] MetaMask configured correctly
- [ ] Test run completed successfully
- [ ] Have backup account with ETH
- [ ] Browser console clear of errors
- [ ] Prepare demo data (patient hash, IPFS hash)

**Demo Flow:**
1. Show disconnected state
2. Connect MetaMask
3. Navigate to dashboard
4. Create prescription
5. Show transaction hash
6. Display QR code
7. Scan QR (optional but impressive!)

---

Good luck with your supervisor demo! 🎓
