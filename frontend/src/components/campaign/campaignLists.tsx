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

  function displayCampaigns() {
    let campaignsLen = campaigns.length;
    
    if (!wallet.publicKey) {
        console.log("No wallet connected")
        return <h2> no wallet connected </h2>
    }

    if (campaignsLen > 0) {
      campaigns.map((camp) => {
              console.log(`campaign ${camp.campaign.campaignAuthor}`)

              return <CampaignCard
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
          })
    } else {
       return <h3 className='text-center w-full font-semibold'> No campaign availabe, try to create one on the /campaign page </h3>
    }


  }

  return (
      <div 
          className={`w-full h-full p-[20px] mt-[20px] gap-[20px]
            ${campaigns.length > 0 ? "grid lg:grid-cols-[repeat(4,minmax(0,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]" : "flex lg:justify-center items-center lg:flex-nowrap flex-wrap"}`}>
      {/* {displayCampaigns()} */}

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
            : <h3 className='text-center w-full font-semibold'> No campaign availabe, try to create one on the /campaign page </h3>
        }
    </div>
  )
}

export default CampaignLists