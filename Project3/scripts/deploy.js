// imports
const hre = require("hardhat");
const fs = require('fs');

// funtion to deploy the contracts
async function main() {

  //deploy the token
  const EPI = await hre.ethers.getContractFactory("EPITokenMint");
  const epi = await EPI.deploy();
  await epi.deployed();
  console.log("epi deployed to:", epi.address);


  // export the addresses
  fs.writeFileSync('scripts/address.js', `
    export const epiAddress = '${epi.address}'

  `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
