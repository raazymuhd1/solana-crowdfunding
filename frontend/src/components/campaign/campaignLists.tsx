"use client"
import { useState } from 'react'
import CampaignCard from './campaignCard'
import { dummyCampaigns } from "@/constants"
import { useCluster } from '../cluster/cluster-data-access'
import useProgram from '@/hooks'
import type { CampaignType } from '@/types'
import dummyImg from "@/assets/images/abs-bg.jpg"
import { PublicKey } from '@solana/web3.js'

const CampaignLists = () => {
 const { getCampaigns } = useCluster()
  const [campaignAccns, setCampaignAccns] = useState<CampaignType[]>([])

  console.log(getCampaigns())

  return (
      <div 
          className={`w-full p-[20px] mt-[20px] gap-[20px]
            ${getCampaigns().length > 0 ? "grid lg:grid-cols-[repeat(4,minmax(0,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]}" : "flex items-center lg:flex-nowrap flex-wrap"} `}>

          {getCampaigns().length > 0 ? getCampaigns().map(camp => (
             <CampaignCard
                key={camp?.campaignDetails.id} 
                {
                    ...{ 
                        campaignPda: new PublicKey(camp.campaignPda),
                        vaultPda: new PublicKey(camp.vaultPda),
                        title: camp?.campaignDetails.title,
                        description: camp?.campaignDetails.description,
                        ["img"]: dummyImg,
                        authority: new PublicKey(camp.campaignDetails.authority),
                        target: camp.campaignDetails.raiseTarget
                    }
                }
             />

          )) : 
            <h3 className='text-center w-full mx-auto font-semibold'> No campaign availabe, try to create one on the /campaign page </h3>
          }
    </div>
  )
}

export default CampaignLists