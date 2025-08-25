"use client"
import { useState } from 'react'
import CampaignCard from './campaignCard'
import { dummyCampaigns } from "@/constants"
import { useCluster } from '../cluster/cluster-data-access'
import type { CampaignType } from '@/types'

const CampaignLists = () => {
  const { getAccount } = useCluster()
  const [campaignAccns, setCampaignAccns] = useState<CampaignType[]>([])

  const gettingAccount = async() => {
      // const campaign = await getAccount();
  }

  return (
      <div 
          className='w-full p-[20px] mt-[20px] grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
          {dummyCampaigns.map(camp => (
             <CampaignCard
                key={camp.id} 
                {
                    ...{ 
                        title: camp.title,
                        desc: camp.desc,
                        ["img"]: camp.img 
                    }
                }
             />
          )) }
    </div>
  )
}

export default CampaignLists