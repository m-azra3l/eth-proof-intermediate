const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("EPIToken", function () {
  let EPI;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const EPIContract = await ethers.getContractFactory("EPIToken");
    EPI = await EPIContract.deploy();

    // Mint some tokens to the contract creator
    await EPI.mint(owner.address, 6);
  });

  it("Should return the correct name, symbol, and total supply", async function () {
    expect(await EPI.name()).to.equal("Eth Proof Intermediate Token");
    expect(await EPI.symbol()).to.equal("EPI");
    expect(await EPI.totalSupply()).to.equal(12);
  });

  it("Should update balances after minting and burning tokens", async function () {
    // Mint some tokens to address 1
    await EPI.connect(owner).mint(addr1.address, 2);

    expect(await EPI.balances(addr1.address)).to.equal(2);
    expect(await EPI.totalSupply()).to.equal(14);

    // Burn some tokens from the contract creator
    await EPI.connect(owner).burn(3);

    expect(await EPI.balances(owner.address)).to.equal(9);
    expect(await EPI.totalSupply()).to.equal(11);
  });

  it("Should revert if an invalid address is provided to mint", async function () {
    await expect(EPI.connect(owner).mint("0x0000000000000000000000000000000000000000", 1)).to.be.revertedWith("Invalid address");
  });

  it("Should revert if the contract creator doesn't have sufficient balance to burn", async function () {
    await expect(EPI.connect(owner).burn(16)).to.be.revertedWith("Insufficient balance");
  });
});
