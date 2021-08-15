require('dotenv').config();
const PancakeFactory = artifacts.require("PancakeFactory.sol");

module.exports = async function (deployer, network, addresses) {
  await deployer.deploy(PancakeFactory, addresses[0]);
  const factory = await PancakeFactory.deployed();
  const initCodeHash = await factory.INIT_CODE_PAIR_HASH()
  
  // This parameter will be used to deploy Router.
  // The contracts for Router are stored in the folder "Periphery",
  // so go to that folder and paste the "Init code hash"
  // into the file libraries/PancakeLibrary.sol on line 23.
  console.log('Init code hash: ', initCodeHash)
};
