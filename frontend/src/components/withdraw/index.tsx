"use client"
import {Dispatch, SetStateAction, useState} from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { useWallet } from '@solana/wallet-adapter-react'
import {useProgram} from '@/hooks'
import { CROWDFUNDS_IDL } from '@/constants'
import { Idl } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

interface IVault {
  vaultAuthority: PublicKey;
  vaultKey: PublicKey;
  campaignKey: PublicKey;
}

const WithdrawFunds = () => {
        const wallet = useWallet()
        const [vaultBalance, setVaultBalance] = useState("0")
        const { connection } = useCluster()
        const [ getProgram ] = useProgram()
        const [vault, setVault] = useState<IVault>({
          vaultAuthority: PublicKey.default,
          vaultKey: PublicKey.default,
          campaignKey: PublicKey.default
        })

        console.log(`vault pubkey: ${ PublicKey.default }`)
        
        const withdrawingFunds = async() => {

            if(!wallet.publicKey) {
               console.log("no wallet connected")
            }


            const vaultKey = typeof vault.vaultKey == "string" ? new PublicKey(vault.vaultKey) : vault.vaultKey
            const campaignKey = typeof vault.campaignKey == "string" ? new PublicKey(vault.campaignKey) : vault.campaignKey
            const vaultAuthority = typeof vault.vaultAuthority == "string" ? new PublicKey(vault.vaultAuthority) : vault.vaultAuthority

            console.log(`vaultKey: ${vaultKey}`)

            const crowdfunds = getProgram()

            try {
                const withdrawTx = await crowdfunds.methods.withdrawFromCampaign(
                    new PublicKey(vault.campaignKey)
                ).accounts({
                  authority: vaultAuthority,
                  vault: vaultKey,
                  campaign: campaignKey
                }).rpc({ commitment: "confirmed" })

                crowdfunds.provider.connection.confirmTransaction(
                   withdrawTx,
                   "confirmed"
                )

                console.log(`wd tx: ${withdrawTx}`)
            } catch (error) {
                console.log(`withdraw failed, something went wrong ${error}`)
            }
        }

  return (
    <section className="w-full h-[60vh] flex flex-col justify-center mt-[30px]">
        <div className='w-full flex items-center flex-col gap-[10px]'>
          <h2 className='font-extrabold text-[clamp(1.5rem,1.3vw,2rem)]'> Funds Withdrawal </h2>
          <p className='font-normal text-[clamp(12px,1vw,16px)]'> Withdraw from the vault of the campaign you've been created. Make sure you have all the required accounts. </p>
        </div>

          <div className='lg:w-[70%] shadows w-[90%] p-[20px] mt-[40px] mx-auto border-[1px] rounded-[10px] flex flex-col gap-[20px] items-center'>
            <aside className='flex items-center gap-[10px] w-full'>
                 <WithdrawalInputs 
                     title="Vault Authority:"
                     placeholder=""
                     vault={vault}
                     setVault={setVault}
                 />

                  <div className="flex w-[50%] flex-col gap-[10px]">
                      <h3 className='font-semibold'> Vault Address: </h3>
                      <input 
                        className="px-[10px] w-full text-center py-[5px] rounded-[10px] border-[1px]"
                        type="text" 
                        placeholder='enter the correct vault address'
                        onInput={async(e) => {
                            try {
                              const vaultBal = await connection.getBalance(new PublicKey(e.currentTarget.value))
                              console.log(`vault Balance ${vaultBal}`)
                              setVaultBalance(vaultBal.toString())
                            } catch(err) {
                              console.log(`invalid account address`)
                            }
                        }}
                        onChange={e => setVault({
                          ...vault,
                          vaultKey: new PublicKey(e.target.value)
                        })}
                        />
                  </div>
            </aside>

              <div className="flex w-full mx-auto flex-col gap-[10px]">
                  <h3 className='font-semibold'> Campaign Address: </h3>
                  <input 
                    className="px-[10px] w-full text-center py-[5px] rounded-[10px]  border-[1px]"
                    type="text" 
                    placeholder='enter the correct campaign address'
                    onChange={e => setVault({
                      ...vault,
                      campaignKey: new PublicKey(e.target.value)
                    })}
                    />
              </div>

              <aside className='flex items-center w-full justify-between'> 
                <button 
                  onClick={withdrawingFunds}
            className='px-[10px] w-[30%] py-[5px] rounded-[10px] font-semibold bg-[#1d0131] dark:bg-[#8617e8] dark:text-[#000] text-[#fff] border-[1px]'> Withdraw 
                </button>

                <h4 className="text-[clamp(12px,1vw,14px)]"> Current vault balance: <strong> {vaultBalance || 0} </strong> </h4>
              </aside>

              <strong className='text-[clamp(8px,1vw,10px)] text-[#000] p-[2px] rounded-[10px] bg-[yellow]'> NOTE: after the withdrawal, all related accounts will be closed </strong>
          </div>
    </section>
  )
}

export default WithdrawFunds

interface InputProps {
  title: string;
  placeholder: string;
  vault: IVault;
  setVault: Dispatch<SetStateAction<IVault>>;
}

const WithdrawalInputs = ({
  vault, setVault, title
}: InputProps) => {
    return (
      <div className="flex w-[50%] flex-col gap-[10px]">
        <h3 className='font-semibold'> { title } </h3>
        <input
          className="px-[10px] w-full placeholder:text-center text-center py-[5px] rounded-[10px] border-[1px]"
          type="text"
          placeholder='enter the correct vault authority address'
          onChange={e => setVault({
            ...vault,
            vaultAuthority: new PublicKey(e.target.value)
          })}
        />
      </div>
    )
}