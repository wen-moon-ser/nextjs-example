import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Environment,
  Moonshot,
} from '@wen-moon-ser/moonshot-sdk';

export type ResponseData = {
  txSignature: string;
  status: string;
};

type ReqData = {
  tokenId: string;
  token: string;
  signedTransaction: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
): Promise<void> {
  try {
    const { tokenId, token, signedTransaction } = req.body as ReqData;

    const moonshot = new Moonshot({
      rpcUrl: 'https://api.devnet.solana.com',
      environment: Environment.DEVNET,
      chainOptions: {
        solana: { confirmOptions: { commitment: 'confirmed' } },
      },
    });

    const submitRes = await moonshot.submitMintTx({
      tokenId: tokenId,
      token: token,
      signedTransaction,
    });

    res.status(200).json({ txSignature: submitRes.txSignature, status: submitRes.status });
  } catch (error) {
    console.error('Error in API call', error);
    res.status(400);
  }
}
