import hre from 'hardhat';

async function main() {
  console.log("Deploying BlockMed contract...");

  const BlockMed = await hre.ethers.getContractFactory("BlockMed");
  const blockMed = await BlockMed.deploy();

  await blockMed.waitForDeployment();

  const contractAddress = await blockMed.getAddress();

  console.log("\n✅ BlockMed contract deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("\n⚠️  IMPORTANT: Copy this address to src/utils/config.js");
  console.log(`\nUpdate the following line:`);
  console.log(`export const CONTRACT_ADDRESS = '${contractAddress}'`);
  
  // Test the contract
  console.log("\n🧪 Testing contract functions...");
  
  const initialCount = await blockMed.prescriptionCount();
  console.log("Initial prescription count:", initialCount.toString());
  
  console.log("\n✨ Contract is ready to use!");
  console.log("Next steps:");
  console.log("1. Copy the contract address above");
  console.log("2. Update src/utils/config.js");
  console.log("3. Run: npm run dev");
  console.log("4. Connect MetaMask and test the application");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
