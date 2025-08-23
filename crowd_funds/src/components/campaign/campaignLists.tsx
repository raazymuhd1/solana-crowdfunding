import React from 'react'
import CampaignCard from './campaignCard'
import { dummyCampaigns } from "@/constants"

const CampaignLists = () => {
  return (
      <div className='w-full p-[20px] mt-[20px] grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(0,1fr))]'>
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