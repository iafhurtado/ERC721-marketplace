[![Compilation](https://github.com/NFT-Lab/ERC721-marketplace/actions/workflows/solidity-compile.yaml/badge.svg)](https://github.com/NFT-Lab/ERC721-marketplace/actions/workflows/solidity-compile.yaml)
[![Test](https://github.com/NFT-Lab/ERC721-marketplace/actions/workflows/tests.yaml/badge.svg)](https://github.com/NFT-Lab/ERC721-marketplace/actions/workflows/tests.yaml)
[![Coverage Status](https://coveralls.io/repos/github/NFT-Lab/ERC721-marketplace/badge.svg)](https://coveralls.io/github/NFT-Lab/ERC721-marketplace)
[![Test](https://github.com/NFT-Lab/ERC721-marketplace/actions/workflows/code-formatting.yaml/badge.svg)](https://github.com/NFT-Lab/ERC721-marketplace/actions/workflows/code-formatting.yaml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# ERC721 Renting Marketplace

## Description

This repo contains the contracts (along with their tests) to build an ERC721 marketplace on ethereum, wich underlying currency can either be ethereum itself (with _eth_) or an IERC20 implementation ([Openzeppelin's implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) or your custom implementation). Can be imported as a npm package (procedure described below), this wway it provides alla the contracts, ABI for them and typechain generated code for static typing in typescript to build a dApp on top of it with [ethers.js](https://github.com/ethers-io/ethers.js/)

### Architecture

The main component is the Marketplace, written in `contracts/Marketplace.sol`. It is responsible for registering trades and holding information about them. It instanciates a `NFTLabStoreMarketplaceVariant`, a contract identical to `NFTLabStore` (a `ERC721URIStorage` and `ERC721Enumerable` contract) that also implements a function to force the transfer of nfts to the marketplace if the param `form` is allowed for that token. this way users can avoid a call to the blockchain allowing the market for the token. the `NFTLabStore` as already mentioned is responsible for holding NFTs, record movements of ownership and minting them, it holds the NFTs as the name suggests. the Marketplace is then specialized into two contracts: `ETHMarketplace` and `ERC20Marketplace`, the difference between the two is the way they handle paymens: `ETHMarketplace` uses ether, while `ERC20Marketplace` can use every `IERC20` contract. The diagram of the architecture is the following

<center>
    <a href="docs/diagram.svg">
        <img src="docs/diagram.svg" height="400px">
    </a>
</center>

### Documentation

More information about the 2 main contracts can be found inside of [docs/NFTLabStore.org](docs/NFTLabStore.org) and [docs/Marketplace.org](docs/Marketplace.org) files.

## Usage

```bash
npm i --save-dev erc721nftlab
```

It installs the package and everythin needed in order to use ABI's alone with web3 or use typechain and ethers for static typing your dapp.

### Install dependencies, compile, build on top of it

```bash
npm i
npm run compile
```

- compile the contracts
- deploy them trough the provided scripts trough an ethereum node ([Infura](infura.io) provides some for free)
- build a frontend that handles contract calls (I suggest [metamask](metamask.io) apis combined with [ethers](https://github.com/ethers-io/ethers.js/) to interact with your contract)
- deploy (if your site is a single page site build for example with angular or react i also suggesto [ipfs](ipfs.io) to deploy it for free)

### Tests

All the contracts are tested with hardhat (and compiled with it), the tests are available in the `test` folder and can be executed with

```bash
npm run test
```

## Contributing

For every feature request submit a pull request and if useful and meaningful wil certainly be approved by someone.

### Standards

all the code to be integrated has to be formatted with [prettier](prettier.io). Fortunately we provide an easy way to do so, just run

```bash
npm run prettify
```

and your code will automatically be formatted, so that everything is uniform. After that commit and make your pull request
