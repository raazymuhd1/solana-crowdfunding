import React from 'react'
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor'
import { WalletContextState } from '@solana/wallet-adapter-react'
import { useCluster } from '@/components/cluster/cluster-data-access'

const useProgram = () => {
    const { connection } = useCluster()

    const getProgram = (wallet: WalletContextState, programIdl: Idl): Program<Idl> => {
        const provider = new AnchorProvider(connection, wallet as any, { commitment: "confirmed" })
        const crowdfunds = new Program(programIdl, provider)
        return crowdfunds;
    }

  return [
      getProgram
  ]
}

export default useProgram