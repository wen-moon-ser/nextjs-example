'use client'

import NoSsr from './nossr';
import {MintProfile} from "@/app/mintProfile";

export default function Home() {
  return (
    <NoSsr>
      <MintProfile />
    </NoSsr>
  );
}
