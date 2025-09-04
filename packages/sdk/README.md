# XNV

<strong>useful web3 tools</strong>

## features

- connect to multiple chains
- create and magage wallets
- local development chains
- deploy smart contracts

now available command:

authoer: [nknighta](https://nknighta.github.io/)

## libraries

- express
  debug server
- ethers.js

## Usage

instance

```ts
import xnv from '@nknighta/vx';

xnv.instance('xnv.config.json');
```

get block number

```ts
const blocknum = xnv.getBlockNumber();

blocknum.then((blocknum) => {
  console.log(`Current block number: ${blocknum}`);
});
```

get balance

```ts
const balance = xnv.getBalance('0x<YOUR_WALLET_ADDRESS>');

balance.then((balance) => {
  console.log(`Current balance: ${balance}`);
});
```
