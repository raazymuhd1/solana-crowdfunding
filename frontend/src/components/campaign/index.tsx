"use client"
import { useCallback, useState} from 'react'
import * as anchor from "@coral-xyz/anchor"
import { CROWDFUNDS_ID, CROWDFUNDS_IDL } from '@/constants'
import { Inputs } from './inputs'
import { useWallet } from '@solana/wallet-adapter-react'
import { useCluster } from '../cluster/cluster-data-access'
import useProgram from '@/hooks'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import type { CampaignDetails } from "@/types"
import { toast } from 'sonner'

// authority: 2pPxaQieCNunVMhzM5fQdFz67pstVNHccYmFSPaXWJaY
// created vaultPda: 7xr9Fdfi7JXG93UXgGX3p3mSbLxfLbXfJPPJuzBqxFFS
// campaign pda created: EB7zktpQ2VD1UTcMackz8iu36E55QhQfJEJStLSPrAEH

const CreateCampaign = () => {
  const wallet = useWallet()
  const { setCampaigns } = useCluster()
  const [ getProgram ] = useProgram()
  const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({
      id: 0,
      title: "",
      description: "",
      raiseTarget: 0,
      authority: ""
  })

  console.log(`wallet addr ${wallet.publicKey}`)

  const createCampaign = async() => {
    const VAULT_SEED = "VAULT_SEED"
    const CAMPAIGN_SEED = "CAMPAIGN_SEED"

    const raiseTarget = new anchor.BN(campaignDetails.raiseTarget);

    if(!wallet.publicKey) {
        console.log("no wallet connected")
        return;
    }

    const CAMPAIGN_AUTHOR = wallet.publicKey.toBuffer();
    // seeds for pdas
    const vaultSeeds = [
        anchor.utils.bytes.utf8.encode(VAULT_SEED),
        CAMPAIGN_AUTHOR
    ]

    const campaignSeeds = [
        anchor.utils.bytes.utf8.encode(CAMPAIGN_SEED),
        CAMPAIGN_AUTHOR,
        Buffer.from(campaignDetails.title || "campaign title", "utf8")
    ]

    // //@ts-ignore
    // const vaultPda = generatePda(vaultSeeds);
    // //@ts-ignore
    // const campPda = generatePda(campaignSeeds);

    const [vaultPda, vaultBump] = PublicKey.findProgramAddressSync(
      vaultSeeds,
      CROWDFUNDS_ID
    )

    const [campaignPda, campBump] = PublicKey.findProgramAddressSync(
      campaignSeeds,
      CROWDFUNDS_ID
    )


      try {
            const campaignTx = await getProgram(
              wallet,
              CROWDFUNDS_IDL as anchor.Idl
            ).methods.initializeCampaign(
              campaignDetails.title,
              campaignDetails.description,
              raiseTarget
            ).accounts({
              campaignAuthor: wallet.publicKey,
              campaign: campaignPda,
              vault: vaultPda,
              systemProgram: SystemProgram.programId
            }).rpc({commitment: "confirmed"})
    
          console.log("new campaign tx", campaignTx)
          console.log(`vault pda ${vaultPda}`)
          console.log(`campaign pda ${campaignPda}`)
          console.log("saving")

          // resetting the whole states
          
        setCampaigns({
            campaignPda: campaignPda,
            vaultPda: vaultPda,
            campaignDetails: {
                ...campaignDetails,
                id: campaignDetails.id + 1,
                authority: campaignDetails.authority
            }
          })

        toast("Vault Address:", {
            description: `${vaultPda.toString()}`,
            action: {
               label: "close",
               onClick: () => console.log("closing")
            }
        })
        toast("Vault Authority Address:", {
            description: `${campaignDetails.authority.toString()}`,
            action: {
               label: "close",
               onClick: () => console.log("closing")
            }
        })
        toast("Campaign Address:", {
            description: `${campaignPda.toString()}`,
            action: {
               label: "close",
               onClick: () => console.log("closing")
            }
        })
      
          setCampaignDetails({
            id: 0,
            title: "",
            description: "",
            raiseTarget: 0,
            authority: ""
          })
      } catch (error) {
          console.log(error)
      }
  }


  return (
    <div className='w-full h-full p-[60px] mt-[40px]'>

      <div className='lg:w-[50%] w-[80%] shadows mx-auto p-[15px] rounded-[15px] border-[1px] flex flex-col gap-[20px]'>
          <div className='flex items-center flex-col gap-[10px]'>
              <h2 className='font-extrabold text-[clamp(1.5rem,1.3vw,2rem)]'> Create Campaign </h2>
              <p className='font-normal text-[clamp(12px,1vw,16px)]'> fill up all the necessary details for your campaign </p>
              <p className='bg-[yellow] text-center font-semibold text-[#000] rounded-[4px] p-[2px]'> <strong> NOTE:  </strong>Please save all the addresses from the popup on the bottom right after created a new campaign </p>
          </div>
          
          <article className='p-[15px] flex flex-col gap-[20px] w-full'>
                <div className='flex flex-col gap-[10px]'>
                      {/* inputs */}  
                      <div className='flex w-full items-center gap-[15px]'>
                        <Inputs
                          labelId="title"
                          inputPlaceholder='enter campaign title'
                          text='Title:'
                          containerStyles='w-[50%]'
                          setCampaignDetails={setCampaignDetails}
                          campaignDetails={campaignDetails}
                          updateField='title'
                          handleChange={() => {}}
                        />
                        <Inputs
                          labelId="authority"
                          inputPlaceholder='enter campaign description'
                          text='Campaign Authority:'
                          containerStyles='w-[50%]'
                          setCampaignDetails={setCampaignDetails}
                          campaignDetails={campaignDetails}
                          updateField='authority'
                          handleChange={() => {}}
                        />
                      </div>

                      {/* description */}
                      <div className="w-full flex flex-col gap-[5px]">
                        <label className='font-semibold' htmlFor="desc"> Description: </label>
                        <textarea 
                          onChange={(e) => setCampaignDetails({
                              ...campaignDetails, description: e.target.value 
                          })}
                          rows={6} 
                          className='w-full p-[10px] border-[1px] rounded-[10px]' 
                          id="desc" 
                          placeholder="enter your campaign description" 
                          />
                      </div>
                          
                      {/* target funds */}
                      <div className="w-full flex flex-col gap-[5px]">
                        <label className='font-semibold' htmlFor="fund"> Fund To Raise: </label>
                        <input
                          onChange={(e) => setCampaignDetails({
                            ...campaignDetails, raiseTarget: Number(e.target.value)
                          })}
                          className='w-full px-[10px] py-[10px] border-[1px] rounded-[10px]' type="number" id="fund" />
                      </div>
                </div>

                {/* a campaign banner & submit btn */}
                <div className='w-full border-[1px] p-[10px] rounded-[10px] min-h-[150px]'>
                    <h4> for banner later </h4>
                </div>

                <button 
                className="px-[10px] py-[5px] shadows border-[1px] bg-[#1d0131] dark:bg-[#8617e8] text-[#fff] dark:text-[#000] font-bold rounded-[10px] w-[30%]"
                  onClick={() => createCampaign()}
                  > 
                  Create Campaign 
                </button>
          </article>
      </div>

    </div>
  )
}

export default CreateCampaign