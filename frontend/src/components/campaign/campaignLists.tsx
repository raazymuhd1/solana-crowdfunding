"use client"
import { useState, useEffect } from 'react'
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
  const [ getCampaigns ] = useCampaigns()
  const [campaignAccns, setCampaignAccns] = useState<CampaignType[]>([])
  const { connection } = useCluster()
  const wallet = useWallet()

  console.log(`campaigns ${getCampaigns().then(items => items.length) }`)

  function displayCampaigns() {
    if (!wallet.publicKey) {
      return <h2 className='font-bold text-center w-full'> No wallet connected </h2>
    }

    if(getCampaigns.length == 0) {
      return <h3 className='text-center w-full font-semibold'> No campaign availabe, try to create one on the /campaign page </h3>
    }

    // getCampaigns().map((camp, idx) => {
    //    if(wallet.publicKey) {
    //       return <CampaignCard
    //         key={idx}
    //           {
    //             ...{
    //               campaignPda: new PublicKey(camp.campaignPda),
    //               vaultPda: new PublicKey(camp.vaultPda),
    //               title: camp?.campaignDetails.title,
    //               description: camp?.campaignDetails.description,
    //               ["img"]: dummyImg,
    //               authority: camp.campaignDetails.authority.length > 0 ? new PublicKey(camp.campaignDetails.authority) : new PublicKey(wallet.publicKey),
    //               target: camp.campaignDetails.raiseTarget
    //             }
    //           }
    //         />
    //       }
    //       return
    // })

  }

  return (
      <div 
          className={`w-full h-full p-[20px] mt-[20px] gap-[20px]
            ${getCampaigns().then(items => items.length > 0 ? "grid lg:grid-cols-[repeat(4,minmax(0,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]}" : "flex lg:justify-center items-center lg:flex-nowrap flex-wrap")} `}>

        {displayCampaigns() }
    </div>
  )
}

export default CampaignLists