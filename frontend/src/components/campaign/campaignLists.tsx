"use client"
import React, { useState } from 'react'
// deps import
import { useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from '@solana/web3.js'
// local imports
import CampaignCard from './campaignCard'
import { dummyCampaigns } from "@/constants"
import { useCluster } from '../cluster/cluster-data-access'
import { useCampaigns } from '@/hooks'
import type { CampaignType } from '@/types'
import dummyImg from "@/assets/images/abs-bg.jpg"

const CampaignLists = () => {
  const [campaigns, isLoading ] = useCampaigns()
  const [campaignAccns, setCampaignAccns] = useState<CampaignType[]>([])
  const { connection } = useCluster()
  const wallet = useWallet()

   console.log(`campaigns ${campaigns.length}`)


  return (
      <div 
          className={`w-full p-[10px] mt-[20px] gap-[30px] lg:gap-x-[100px]
            ${campaigns.length > 0 ? "grid lg:grid-cols-[repeat(4,minmax(0,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] grid-cols-[repeat(1,minmax(100px,1fr))]" : "flex lg:justify-center items-center lg:flex-nowrap flex-wrap"}`}>

        {
          campaigns.length > 0 
          ? campaigns.map((camp) => (
              <CampaignCard
                  key={camp.vaultPda.toBase58()}
                    {
                      ...{
                        campaignPda: camp.campaignPda,
                        vaultPda: camp.vaultPda,
                        title: camp?.campaign.title,
                        description: camp?.campaign.description,
                        ["img"]: dummyImg,
                        authority: camp?.campaign?.campaignAuthor,
                        target: camp.campaign.raiseTarget.toString()
                      }
                    }
              />
          )) 
            : 
            <h3 className='text-center w-full font-semibold'> No campaign availabe, try to create one on the /campaign page 
            </h3>
        }
    </div>
  )
}

export default CampaignLists