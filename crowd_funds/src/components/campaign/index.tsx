"use client"
import React from 'react'
import * as anchor from "@coral-xyz/anchor"
import { CROWDFUNDS_ID } from '@/constants'
import { InputComp, Inputs } from './inputs'
import { useWallet } from '@solana/wallet-adapter-react'
import { useCluster } from '../cluster/cluster-data-access'
import { Keypair, PublicKey } from '@solana/web3.js'

const CreateCampaign = () => {
  const wallet = useWallet()
  const { getProgram } = useCluster()
  
  const createCampaign = async() => {
      const VAULT_SEED = "VAULT_SEED"
      const CAMPAIGN_SEED = "CAMPAIGN_SEED"

      const CAMPAIGN_TITLE = "SAVE THE KIDS"
      const CAMPAIGN_DESC = "Let's save the kids now, stop the thing going on"
      const raiseTarget = new anchor.BN(10_000_000_000);
      const CAMPAIGN_AUTHOR = wallet.publicKey ? wallet.publicKey?.toBuffer() : null

      const vaultSeeds = [
        anchor.utils.bytes.utf8.encode(VAULT_SEED),
        CAMPAIGN_AUTHOR
      ]
      const campaignSeeds = [
        anchor.utils.bytes.utf8.encode(CAMPAIGN_SEED),
        CAMPAIGN_AUTHOR,
        Buffer.from(CAMPAIGN_TITLE, "utf8")
      ]

      const [vaultPda, vaultBump] = PublicKey.findProgramAddressSync(
        vaultSeeds,
        CROWDFUNDS_ID
      )
      const [campPda, campBump] = PublicKey.findProgramAddressSync(
        campaignSeeds,
        CROWDFUNDS_ID
      )

      try {
          const campaignTx = await getProgram().methods.initializeCampaign(
            CAMPAIGN_TITLE,
            CAMPAIGN_DESC,
            raiseTarget
          ).accounts({
            campaignAuthor: wallet.publicKey != null && wallet.publicKey,
            campaign: campPda,
            vault: vaultPda
          }).rpc({commitment: "confirmed"})
    
          console.log("new campaign tx", campaignTx)
      
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <div className='w-[50%] mt-[40px] mx-auto p-[15px] rounded-[15px] border-[1px] flex flex-col gap-[20px]'>
        <div className='flex items-center flex-col gap-[10px]'>
            <h2 className='font-extrabold text-[clamp(1.5rem,1.3vw,2rem)]'> Create Campaign </h2>
            <p className='font-normal text-[clamp(12px,1vw,16px)]'> fill up all the necessary details for your campaign </p>
        </div>
        
        <article className='p-[15px] flex flex-col gap-[20px] w-full'>
              <div className='flex flex-col gap-[10px]'>
                    {/* inputs */}  
                    <Inputs />
                    {/* campaign authority */}
                    <div className="w-full flex flex-col gap-[5px]">
                      <label htmlFor="desc"> Description: </label>
                      <textarea rows={6} 
                        className='w-full p-[10px] border-[1px] rounded-[10px]' 
                        id="desc" 
                        placeholder="enter your campaign description" 
                        />
                    </div>
                        
              </div>

          {/* a campaign banner & submit btn */}
          <div className='w-full border-[1px] p-[10px] rounded-[10px] min-h-[150px]'>
              <h4> for banner later </h4>
          </div>

          <button 
            className="px-[10px] py-[5px] border-[1px] bg-[#fff] text-[#000] font-bold rounded-[10px] w-[30%]"
            onClick={() => createCampaign()}
            > 
            Submit Campaign 
           </button>
        </article>

    </div>
  )
}

export default CreateCampaign