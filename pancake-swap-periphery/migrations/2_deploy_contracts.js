require('dotenv').config();
const Router = artifacts.require("PancakeRouter.sol");


module.exports = async function (deployer) {
  let WETH_ADDRESS;
  let FACTORY_ADDRESS;
  FACTORY_ADDRESS = process.env.FACTORY_ADDRESS_TELOS;
  WETH_ADDRESS = process.env.WETH_ADDRESS_TELOS;
  
  await deployer.deploy(Router, FACTORY_ADDRESS, WETH_ADDRESS);
};
