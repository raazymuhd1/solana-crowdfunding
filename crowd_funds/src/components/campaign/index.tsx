"use client"
import { useMemo, useCallback, useState} from 'react'
import * as anchor from "@coral-xyz/anchor"
import { CROWDFUNDS_ID } from '@/constants'
import { Inputs } from './inputs'
import { useWallet } from '@solana/wallet-adapter-react'
import { useCluster } from '../cluster/cluster-data-access'
import { Keypair, PublicKey } from '@solana/web3.js'
import type { CampaignDetails } from "@/types"

type BufferArr = (Buffer<ArrayBufferLike> | Uint8Array<ArrayBufferLike>);

const CreateCampaign = () => {
  const wallet = useWallet()
  const { getProgram } = useCluster()
  const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({
      title: "",
      description: "",
      raiseTarget: 0
  })

  const generatePda = useCallback((seeds: BufferArr) => {
    const [pda, vaultBump] = PublicKey.findProgramAddressSync(
      seeds,
      CROWDFUNDS_ID
    )
    
    return pda;
  }, [])

  const createCampaign = async() => {
    const VAULT_SEED = "VAULT_SEED"
    const CAMPAIGN_SEED = "CAMPAIGN_SEED"

    const raiseTarget = new anchor.BN(campaignDetails.raiseTarget);
    const CAMPAIGN_AUTHOR = wallet.publicKey ? wallet.publicKey?.toBuffer() : null

    // seeds for pdas
    const vaultSeeds = [
        anchor.utils.bytes.utf8.encode(VAULT_SEED),
        CAMPAIGN_AUTHOR
    ]

    const campaignSeeds = [
        anchor.utils.bytes.utf8.encode(CAMPAIGN_SEED),
        CAMPAIGN_AUTHOR,
        Buffer.from(campaignDetails.title, "utf8")
    ]

    //@ts-ignore
    const vaultPda = generatePda(vaultSeeds);
    //@ts-ignore
    const campPda = generatePda(campaignSeeds);


      try {
          const campaignTx = await getProgram().methods.initializeCampaign(
            campaignDetails.title,
            campaignDetails.description,
            raiseTarget
          ).accounts({
            campaignAuthor: wallet.publicKey != null && wallet.publicKey,
            campaign: campPda,
            vault: vaultPda
          }).rpc({commitment: "confirmed"})
    
          console.log("new campaign tx", campaignTx)
          console.log(`vault pda ${vaultPda}`)
          console.log(`campaign pda ${campPda}`)
          
          // resetting the whole states
          setCampaignDetails({
            title: "",
            description: "",
            raiseTarget: 0
          })
      } catch (error) {
          console.log(error)
      }
  }


  return (
    <div className='lg:w-[50%] w-[80%] mt-[40px] mx-auto p-[15px] rounded-[15px] border-[1px] flex flex-col gap-[20px]'>
        <div className='flex items-center flex-col gap-[10px]'>
            <h2 className='font-extrabold text-[clamp(1.5rem,1.3vw,2rem)]'> Create Campaign </h2>
            <p className='font-normal text-[clamp(12px,1vw,16px)]'> fill up all the necessary details for your campaign </p>
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
                        updateField=''
                      />
                      <Inputs
                        labelId="authority"
                        inputPlaceholder='enter campaign description'
                        text='Campaign Authority:'
                        containerStyles='w-[50%]'
                        setCampaignDetails={setCampaignDetails}
                        campaignDetails={campaignDetails}
                        updateField=''
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
            className="px-[10px] py-[5px] border-[1px] bg-[#fff] text-[#000] font-bold rounded-[10px] w-[30%]"
            onClick={() => createCampaign()}
            > 
            Create Campaign 
           </button>
        </article>

    </div>
  )
}

export default CreateCampaign