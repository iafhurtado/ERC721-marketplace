import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { MockContract, smockit } from "@eth-optimism/smock";
import { expect } from "chai";
import { ETHMarketplace } from "typechain";

describe("ETHMarketplace - openTrade tests", function () {
  let signers: SignerWithAddress[];
  let nftLabMarketplaceFactory: ContractFactory;
  let nftLabMarketplace: ETHMarketplace;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    nftLabMarketplaceFactory = await ethers.getContractFactory(
      "ETHMarketplace",
      signers[0]
    );

    nftLabMarketplace = (await nftLabMarketplaceFactory.deploy(
      "NFTLab",
      "NFTL"
    )) as ETHMarketplace;
  });

  it("Should open a new trade", async () => {
    const tokenID = nftLabMarketplace.mint(signers[1].address, {
      cid: "cid",
      metadataCid: "metadataCid",
    });
    await expect(nftLabMarketplace.openTrade(1, 1)).to.emit(
      nftLabMarketplace,
      "TradeStatusChange"
    );
  });

  it("Should not open a new trade if sender does not own the article", async () => {
    await expect(nftLabMarketplace.openTrade(1, 1)).to.be.revertedWith("");
  });
});
