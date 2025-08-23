import React from 'react'
import { InputComp, Inputs } from './inputs'

const CreateCampaign = () => {
  return (
    <div className='w-[50%] mt-[40px] mx-auto p-[15px] rounded-[15px] border-[1px] flex flex-col gap-[20px]'>
        <div className='flex items-center flex-col gap-[10px]'>
            <h2 className='font-extrabold text-[clamp(1.5rem,1.3vw,2rem)]'> Create Campaign </h2>
            <p className='font-normal text-[clamp(12px,1vw,16px)]'> fill up all the necessary details for your campaign </p>
        </div>

        <Inputs />

        {/* campaign authority */}
          <InputComp
            inputPlaceholder='enter campaign autority pubkey' 
            text='Campaign Authority:' 
            containerStyles='w-full' 
          />
    </div>
  )
}

export default CreateCampaign