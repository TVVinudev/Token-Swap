const { expect } = require('chai');
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers')

describe('LiquidityPool', function () {
  async function deployContract() {
    const [owner, addr1] = await ethers.getSigners();

    const TokenA = await ethers.getContractFactory('Smash');
    const tokenA = await TokenA.deploy();
    await tokenA.waitForDeployment(); 

  
    const TokenB = await ethers.getContractFactory('Doll');
    const tokenB = await TokenB.deploy();
    await tokenB.waitForDeployment(); 

  
    const LiquidityPoolFactory = await ethers.getContractFactory('LiquidityPool');
    const liquidityPool = await LiquidityPoolFactory.deploy(await tokenA.getAddress(), await tokenB.getAddress());
    await liquidityPool.waitForDeployment(); 

    return { owner, addr1, tokenA, tokenB, liquidityPool };
  }

  it("should deploy the liquidity pool", async function () {
    const { liquidityPool } = await loadFixture(deployContract);
    console.log(liquidityPool.target);
  });

  it("should perform a token swap", async function () {
    const { owner, addr1, tokenA, tokenB, liquidityPool } = await loadFixture(deployContract);
    console.log(addr1.address);

    const initialAmountA = ethers.parseEther("1000");
    const initialAmountB = ethers.parseEther("1000");
    const swapAmount = ethers.parseEther("10");

    
    await tokenA.mint(addr1.address, initialAmountA);

    await tokenB.mint(addr1.address, initialAmountB);
    console.log(await tokenA.balanceOf(addr1.address));


    
    const tokenAWithAddr1 = tokenA.connect(addr1);
    const tokenBWithAddr1 = tokenB.connect(addr1);
    const liquidityPoolWithAddr1 = liquidityPool.connect(addr1);

  
    await tokenAWithAddr1.approve(await liquidityPool.getAddress(), initialAmountA);
    await tokenBWithAddr1.approve(await liquidityPool.getAddress(), initialAmountB);

    console.log(
      "all", await tokenAWithAddr1.allowance(addr1.address, liquidityPool.target)
    )

    await liquidityPoolWithAddr1.addLiquidity(swapAmount, swapAmount);

    
    const tokenBBalanceBefore = await tokenB.balanceOf(await addr1.getAddress());
    await liquidityPoolWithAddr1.swap(await tokenA.getAddress(), swapAmount);
    const tokenBBalanceAfter = await tokenB.balanceOf(await addr1.getAddress());

  
    expect(tokenBBalanceAfter).to.be.gt(tokenBBalanceBefore);
  });
});