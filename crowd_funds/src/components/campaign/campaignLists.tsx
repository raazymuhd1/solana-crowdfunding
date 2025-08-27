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
  const [getProgram]  = useProgram()
  const [campaignAccns, setCampaignAccns] = useState<CampaignType[]>([])

  console.log(getCampaigns())

  return (
      <div 
          className='w-full p-[20px] mt-[20px] grid gap-[20px] lg:grid-cols-[repeat(4,minmax(0,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>

          {getCampaigns().length > 0 && getCampaigns().map(camp => (
             <CampaignCard
                key={camp?.campaignDetails.id} 
                {
                    ...{ 
                        campaignPda: camp.campaignPda,
                        vaultPda: camp.vaultPda,
                        title: camp?.campaignDetails.title,
                        description: camp?.campaignDetails.description,
                        ["img"]: dummyImg,
                        authority: new PublicKey(camp.campaignDetails.authority),
                        target: camp.campaignDetails.raiseTarget
                    }
                }
             />

          )) }
    </div>
  )
}

export default CampaignLists