"use client"
import { useState, useEffect} from 'react'
import * as anchor from "@coral-xyz/anchor"
import { CROWDFUNDS_ID, CROWDFUNDS_IDL } from '@/constants'
import { Inputs } from './inputs'
import { useWallet } from '@solana/wallet-adapter-react'
import { useCluster } from '../cluster/cluster-data-access'
import { useProgram } from '@/hooks'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import type { CampaignDetails } from "@/types"
import { toast } from 'sonner'

// authority: 2pPxaQieCNunVMhzM5fQdFz67pstVNHccYmFSPaXWJaY
// created vaultPda: 7xr9Fdfi7JXG93UXgGX3p3mSbLxfLbXfJPPJuzBqxFFS
// campaign pda created: EB7zktpQ2VD1UTcMackz8iu36E55QhQfJEJStLSPrAEH

interface AccountsDetail {
   title: string;
   description: string;
}

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
  const [accountsDetail, setAccountsDetail] = useState<AccountsDetail[]>([])
  const [accounts, setAccounts] = useState<PublicKey[]>([])

  useEffect(() => {

    const importantAccounts = [
      {
        title: "Vault Address",
        description: accounts[0].toString()
      },
      {
        title: "Vault Authority Address",
        description: campaignDetails.authority.toString(),
      },
      {
        title: "Campaign Address",
        description: accounts[1].toString()
      },
    ]

    for (const acc of importantAccounts) {
      toast(`${acc.title}:`, {
        description: `${acc.description}`,
        action: {
          label: "close",
          onClick: () => console.log("closing")
        }
      })
    }

  }, [accountsDetail, campaignDetails.authority])


  /**
   * @dev creating a new campaign
   */
  const createCampaign = async() => {
    const VAULT_SEED = "VAULT_SEED"
    const CAMPAIGN_SEED = "CAMPAIGN_SEED"
    const raiseTarget = new anchor.BN(campaignDetails.raiseTarget);

    if (!wallet.publicKey) {
      console.log("no wallet connected")
      return;
    }

    // seeds for pdas
    const vaultSeeds = [
      anchor.utils.bytes.utf8.encode(VAULT_SEED),
      wallet.publicKey?.toBuffer()
    ]

    const campaignSeeds = [
      anchor.utils.bytes.utf8.encode(CAMPAIGN_SEED),
      wallet.publicKey?.toBuffer(),
      Buffer.from(campaignDetails.title || "campaign title", "utf8")
    ]

    const [vaultPda] = PublicKey.findProgramAddressSync(
      vaultSeeds,
      CROWDFUNDS_ID
    )

    const [campaignPda] = PublicKey.findProgramAddressSync(
      campaignSeeds,
      CROWDFUNDS_ID
    )

    setAccounts([
      vaultPda, campaignPda
    ])

  
      try {
          const crowdfunds = getProgram()
          
          const campaignTx = await crowdfunds.methods.initializeCampaign(
            campaignDetails.title,
            campaignDetails.description,
            raiseTarget
          ).accounts({
            campaignAuthor: wallet.publicKey,
            campaign: campaignPda,
            vault: vaultPda,
            systemProgram: SystemProgram.programId
          }).rpc({commitment: "confirmed"})
    
          // console.log("new campaign tx", campaignTx)
          console.log(`vault pda ${vaultPda}`)
          console.log(`campaign pda ${campaignPda}`)
          console.log(`accounts detail ${accountsDetail}`)
          console.log("saving")

          // resetting the whole states
          
        setCampaigns({
            campaignPda: accounts[1],
            vaultPda: accounts[0],
            campaignDetails: {
                ...campaignDetails,
                id: campaignDetails.id + 1,
                authority: campaignDetails.authority
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
    <div className='w-full h-full lg:p-[30px] p-[20px] mt-[40px]'>

      <div className='lg:w-[80%] xl:w-[50%] w-full h-full shadows mx-auto p-[15px] rounded-[15px] border-[1px] flex flex-col gap-[20px]'>
          <div className='flex items-center flex-col gap-[10px]'>
              <h2 className='font-extrabold text-[clamp(1.5rem,1.3vw,2rem)]'> Create Campaign </h2>
              <p className='font-normal text-[clamp(12px,1vw,16px)]'> fill up all the necessary details for your campaign </p>
              <p className='bg-[yellow] text-center font-semibold text-[#000] rounded-[4px] p-[2px] text-[clamp(12px,1vw,14px)]'> <strong> NOTE:  </strong>Please save all the addresses from the popup on the bottom right after created a new campaign </p>
          </div>
          
          <article className='p-[15px] flex flex-col gap-[20px] w-full'>
                <div className='flex flex-col gap-[10px]'>
                      {/* inputs */}  
                      <div className='flex w-full lg:flex-row flex-col items-center gap-[15px]'>
                        <Inputs
                          labelId="title"
                          inputPlaceholder='enter campaign title'
                          text='Title:'
                          containerStyles='lg:w-[50%] w-full'
                          setCampaignDetails={setCampaignDetails}
                          campaignDetails={campaignDetails}
                          updateField='title'
                          handleChange={() => {}}
                        />
                        <Inputs
                          labelId="authority"
                          inputPlaceholder='enter campaign description'
                          text='Campaign Authority:'
                          containerStyles='lg:w-[50%] w-full'
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