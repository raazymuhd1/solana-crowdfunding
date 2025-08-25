"use client"
import React from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { useWallet } from '@solana/wallet-adapter-react'


const WithdrawFunds = () => {
        const wallet = useWallet()
        const { getProgram } = useCluster()

        const withdrawingFunds = async() => {
            
        }

  return (
    <section className="w-full mt-[30px]">
        <div className='w-full flex items-center flex-col gap-[10px]'>
          <h2 className='font-extrabold text-[clamp(1.5rem,1.3vw,2rem)]'> Funds Withdrawal </h2>
          <p className='font-normal text-[clamp(12px,1vw,16px)]'> Withdraw from the vault of the campaign you've been created. </p>
        </div>

          <div className='w-[50%] p-[20px] mt-[40px] mx-auto border-[1px] rounded-[10px] flex flex-col gap-[20px] items-center'>
              <div className="flex w-[90%] mx-auto items-center flex-col gap-[10px]">
                  <h3 className='font-semibold'> Campaign Authority: </h3>
                  <input 
                    className="px-[10px] w-full placeholder:text-center text-center py-[5px] rounded-[10px] border-[1px]"
                    type="text" 
                    placeholder='enter the correct campaign authority address' />
              </div>
              
              <button className='px-[10px] w-[30%] py-[5px] rounded-[10px] border-[1px]'> Withdraw </button>
          </div>
    </section>
  )
}

export default WithdrawFunds