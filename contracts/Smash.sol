// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Smash is ERC20{
    constructor() ERC20("SmashToken", "SMH")
    {
        _mint(msg.sender, 100000 * (10**18) );
    }

}