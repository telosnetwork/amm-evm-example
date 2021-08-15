require('dotenv').config();

const CakeToken = artifacts.require("CakeToken");
const SyrupBar = artifacts.require("SyrupBar");
const MasterChef = artifacts.require("MasterChef");

module.exports = async function(deployer) {

  await deployer.deploy(CakeToken)
  const cakeToken = await CakeToken.deployed()

  await deployer.deploy(SyrupBar, cakeToken.address)
  const syrupBar = await SyrupBar.deployed()
  
  await deployer.deploy(
    MasterChef,
    cakeToken.address,
    syrupBar.address,
    process.env.DEV_ADDRESS,
    process.env.CAKE_PER_BLOCK,
    process.env.CAKE_MINT_START_BLOCK
  )
  
  const masterChef = await MasterChef.deployed()
  await cakeToken.transferOwnership(masterChef.address)
  await syrupBar.transferOwnership(masterChef.address)
  
};
