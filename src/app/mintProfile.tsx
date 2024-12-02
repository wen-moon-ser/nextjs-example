'use client'

import {WalletContextProvider} from "@/app/WalletContextProvider";
import styles from "@/app/page.module.css";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {Mint} from "@/app/mint";

export const MintProfile = () => {
  return (
    <WalletContextProvider>
      <div className={styles.page}>
        <WalletMultiButton  />
        <div>
          <span>Mint example</span><br/>
          <br/>
          <Mint/>
        </div>
      </div>
    </WalletContextProvider>);
}
