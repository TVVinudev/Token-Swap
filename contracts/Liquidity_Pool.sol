// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityPool {
    address public tokenA;
    address public tokenB;
    uint256 public reserveA;
    uint256 public reserveB;

    mapping(address => uint256) public liquidity;

    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed provider, uint256 amountA, uint256 amountB);
    event Swap(address indexed trader, address inputToken, address outputToken, uint256 inputAmount, uint256 outputAmount);

    constructor(address _tokenA, address _tokenB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function addLiquidity(uint256 amountA, uint256 amountB) public {
        require(amountA > 0 && amountB > 0, "Invalid amounts");

        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);

        reserveA += amountA;
        reserveB += amountB;
        liquidity[msg.sender] += amountA + amountB;

        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) public {
        require(amountA > 0 && amountB > 0, "Invalid amounts");
        require(reserveA >= amountA && reserveB >= amountB, "Insufficient reserves");
        require(liquidity[msg.sender] >= amountA + amountB, "Insufficient liquidity");

        reserveA -= amountA;
        reserveB -= amountB;
        liquidity[msg.sender] -= amountA + amountB;

        IERC20(tokenA).transfer(msg.sender, amountA);
        IERC20(tokenB).transfer(msg.sender, amountB);

        emit LiquidityRemoved(msg.sender, amountA, amountB);
    }

    function swap(address inputToken, uint256 inputAmount) public returns (uint256 outputAmount) {
        require(inputToken == tokenA || inputToken == tokenB, "Invalid token");
        require(inputAmount > 0, "Invalid input amount");

        bool isTokenA = inputToken == tokenA;
        address outputToken = isTokenA ? tokenB : tokenA;
        uint256 inputReserve = isTokenA ? reserveA : reserveB;
        uint256 outputReserve = isTokenA ? reserveB : reserveA;

        require(inputReserve > 0 && outputReserve > 0, "Insufficient liquidity");

        IERC20(inputToken).transferFrom(msg.sender, address(this), inputAmount);

        uint256 inputAmountWithFee = inputAmount * 997 / 1000; // 0.3% fee
        outputAmount = (inputAmountWithFee * outputReserve) / (inputReserve + inputAmountWithFee);

        require(outputAmount > 0, "Insufficient output amount");

        IERC20(outputToken).transfer(msg.sender, outputAmount);

        if (isTokenA) {
            reserveA += inputAmount;
            reserveB -= outputAmount;
        } else {
            reserveB += inputAmount;
            reserveA -= outputAmount;
        }

        emit Swap(msg.sender, inputToken, outputToken, inputAmount, outputAmount);
    }

    function getReserves() public view returns (uint256, uint256) {
        return (reserveA, reserveB);
    }
}
