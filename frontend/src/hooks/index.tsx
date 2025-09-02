import React from 'react'
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor'
import { useWallet, WalletContextState,  } from '@solana/wallet-adapter-react'
import { useCluster } from '@/components/cluster/cluster-data-access'
import type { CampaignType } from '@/types'
import { CROWDFUNDS_IDL } from '@/constants'

export const useProgram = () => {
    const { connection } = useCluster()
    const wallet = useWallet()

    const getProgram = (): Program<Idl> => {
        const provider = new AnchorProvider(connection, wallet as any, { commitment: "confirmed" })
        const crowdfunds = new Program(CROWDFUNDS_IDL, provider)
        console.log(`programId: ${crowdfunds.programId}`)
        return crowdfunds;
    }

  return [
      getProgram
  ]
}


export const useCampaigns = () => {
        const [getProgram] = useProgram() 

    const getCampaigns = async(): Promise<CampaignType[]> => {
            const crowdfunds = getProgram()
            const campaignAccounts = await crowdfunds.account.campaign.all()
    
            return campaignAccounts
    }

    return [getCampaigns]
}