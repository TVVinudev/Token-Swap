// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("LiquidityModule", (m) => {
  const TokenA = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const TokenB = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

  const liquidityPool = m.contract("LiquidityPool", [TokenA,TokenB]);

  return { liquidityPool };
});

//0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0