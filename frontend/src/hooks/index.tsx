"use client"
import { useEffect, useState } from 'react'
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor'
import { useWallet, WalletContextState,  } from '@solana/wallet-adapter-react'
import { useCluster } from '@/components/cluster/cluster-data-access'
import type { CampaignLists } from '@/types'
import { CROWDFUNDS_IDL } from '@/constants'
import { PublicKey } from '@solana/web3.js'

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
            return undefined as any
        }
    }

  return [
      getProgram
  ]
}


export const useCampaigns = () => {
        const [getProgram] = useProgram() 
        const [campaigns, setCampaigns] = useState<CampaignLists[]>([])
        const [isLoading, setIsLoading] = useState(false)

    const getCampaigns = async(): Promise<CampaignLists[]> => {
        setIsLoading(true)

        try {
            const crowdfunds = getProgram()
            // @ts-expect-error the vault account does exist on the program
            const vaultAccounts = await crowdfunds.account.vault.all();
            
            // @ts-expect-error the vault account does exist on the program
            const allCampaigns = vaultAccounts.map(vault => {
                console.log(`type of title ${typeof vault.account.campaign.title}`)
                console.log(`type of desc ${typeof vault.account.campaign.description}`)
                console.log(`type of target ${typeof vault.account.campaign.raiseTarget}`)
                console.log(`type of author ${typeof vault.account.campaign.campaignAuthor}`)

                const { publicKey, account } = vault;
                console.log(`vault ${account}`)

                return {
                    vaultPda: publicKey,
                    campaignPda: account.campaignPda,
                    campaign: account.campaign
                }
            });
            
            console.log(`allCampaigns ${allCampaigns}`)
            setCampaigns(allCampaigns)
            return allCampaigns
        } catch(err) {
            console.log(`error getting campaigns: ${err}`)
            return []
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
         const gettingCampaigns = async() => {
           await getCampaigns()
         }

         gettingCampaigns()
    }, [])


    return [campaigns, isLoading] as const
}