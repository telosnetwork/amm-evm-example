require('dotenv').config();

const CakeVault = artifacts.require("CakeVault");
const VaultOwner = artifacts.require("VaultOwner");

module.exports = async function(deployer) {
  
  await deployer.deploy(
    CakeVault,
    process.env.CAKE_ADDRESS,
    process.env.SYRUP_ADDRESS,
    process.env.MASTERCHEF_ADDRESS,
    process.env.ADMIN_ADDRESS,
    process.env.TREASURY_ADDRESS
  )
  
  const cakeVault = await CakeVault.deployed()
  
  await deployer.deploy(VaultOwner, cakeVault.address)
  const vaultOwner = await VaultOwner.deployed()
  
  await cakeVault.setAdmin(vaultOwner.address)
  await cakeVault.transferOwnership(vaultOwner.address)
  
};
