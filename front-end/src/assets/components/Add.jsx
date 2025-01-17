import React from 'react';
import { ethers } from 'ethers';
import ABI from '../contract data/SimpleLiquidityPool.json';
import Address from '../contract data/deployed_addresses.json';

const Add = () => {
  const handleSubmit = async () => {
    const tokenA = document.getElementById('tokenA').value;
    const tokenB = document.getElementById('tokenB').value;

    console.log('Token A Amount:', tokenA);
    console.log('Token B Amount:', tokenB);

    try {
      
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!');
        return;
      }

    
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      
      const abi = ABI.abi;
      const cAddress = Address["LiquidityModule#LiquidityPool"];
      const liquidityPool = new ethers.Contract(cAddress, abi, signer);

    
      const tokenAAmount = ethers.parseUnits(tokenA, 18); 
      const tokenBAmount = ethers.parseUnits(tokenB, 18);

      const transaction = await liquidityPool.addLiquidity(tokenAAmount, tokenBAmount);

      await transaction.wait();
      console.log(transaction);
      


      console.log("Listening for LiquidityAdded events...");
    } catch (error) {
      console.error("Error adding liquidity:", error);
      alert("Error adding liquidity. Check the console for more details.");
    }
  };

  return (
    <div className="mt-24 shadow-lg p-10">
      <div className="mb-5">
        <label htmlFor="tokenA" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          TokenA Amount
        </label>
        <input
          type="number"
          id="tokenA"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="min:1000"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="tokenB" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          TokenB Amount
        </label>
        <input
          type="number"
          id="tokenB"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="min:1000"
          required
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default Add;
