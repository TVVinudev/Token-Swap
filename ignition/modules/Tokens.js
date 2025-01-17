// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("TokenModules", (m) => {

  const doll = m.contract("Doll");
  const smash = m.contract("Smash");

  return { doll, smash };
});

//0x5FbDB2315678afecb367f032d93F642f64180aa3 -token A
//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 -Token B