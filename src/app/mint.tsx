import {useWallet} from "@solana/wallet-adapter-react";
import {SolanaSerializationService} from "@wen-moon-ser/moonshot-sdk";
import {useState} from "react";

export const Mint = () => {
  const {wallet, signTransaction} = useWallet()
  const [signature, setSignature] = useState<string | undefined>(undefined)

  const mintPrepare = async () => {
    try {
      const response = await fetch('/api/mint/prepare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creator: wallet?.adapter.publicKey?.toBase58(),
        }),
      })
      const data = await response.json() as { tokenId: string, token: string, serializedTx: string };

      const deserializedTransaction =
        SolanaSerializationService.deserializeVersionedTransaction(
          data.serializedTx,
        );
      if (deserializedTransaction == null) {
        throw new Error('Failed to deserialize transaction');
      }

      if(signTransaction != null) {
        const tx = await signTransaction(deserializedTransaction);
        const serialized = SolanaSerializationService.serializeVersionedTransaction(tx);
        const submitResponse = await fetch('/api/mint/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenId: data.tokenId,
            token: data.token,
            signedTransaction: serialized,
          }),
        });
        const submitData= await submitResponse.json() as { txSignature: string, status: string };
        setSignature(submitData.txSignature)
      }

    } catch (error) {
      console.log(error)

    }
  }

  return (
    <div>
      <br/>
      <button onClick={() => mintPrepare()}>Mint Test</button>
      {signature && <a href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}>Tx Signature</a>}
    </div>
  )
}
