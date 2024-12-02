# @wen-moon-ser/moonshot-sdk Nextjs Example

This is a simple example of mint funcitonality using the moonshot sdk.
The Nextjs app has 2 endpoints, prepare/submit, using which we create a mint instruction, serialize it send it to the UI, which then sings the transaction using solana wallet adapter and sends the serialized transaction back to submit endpoint. This in turn submits the transaction to blockchain.

## Getting Started

First, run the development server:

```bash
yarn install

& 

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
