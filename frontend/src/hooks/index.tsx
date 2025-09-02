import { useEffect, useState } from 'react'
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor'
import { useWallet, WalletContextState,  } from '@solana/wallet-adapter-react'
import { useCluster } from '@/components/cluster/cluster-data-access'
import type { CampaignType } from '@/types'
import { CROWDFUNDS_IDL } from '@/constants'

export const useProgram = () => {
    const { connection } = useCluster()
    const wallet = useWallet()

    const getProgram = (): Program<Idl> => {
        try {
            const provider = new AnchorProvider(connection, wallet as any, { commitment: "confirmed" })
            const crowdfunds = new Program(CROWDFUNDS_IDL, provider)
            console.log(`programId: ${crowdfunds.programId}`)
            return crowdfunds;
            
        } catch (error) {
            console.log(`error getting program: ${error}`)
        }
    }

  return [
      getProgram
  ]
}


export const useCampaigns = () => {
        const [getProgram] = useProgram() 
        const [campaigns, setCampaigns] = useState()

    const getCampaigns = async(): Promise<CampaignType[]> => {
        try {
            const crowdfunds = getProgram()
            const campaignAccounts = await crowdfunds.account.campaign.all()
            
            setCampaigns(campaignAccounts)
            return campaignAccounts
        } catch(err) {
            console.log(`error getting campaigns: ${err}`)
            return []
        }
    }

    useEffect(() => {
        getCampaigns()
    }, [])

    return [campaigns]
}