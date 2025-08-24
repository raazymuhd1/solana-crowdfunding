import React from 'react'
import { InputComp, Inputs } from './inputs'

const CreateCampaign = () => {
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
                      <textarea rows={10} 
                        className='w-full p-[10px] border-[1px] rounded-[10px]' 
                        id="desc" 
                        placeholder="enter your campaign description" 
                        />
                    </div>
                        
              </div>

          {/* a campaign banner & submit btn */}
          <div className='w-full border-[1px] p-[10px] rounded-[10px] min-h-[150px]'>

          </div>

          <button 
            className="px-[10px] py-[5px] border-[1px] bg-[#fff] text-[#000] font-bold rounded-[10px] w-[30%]"> 
            Submit Campaign 
           </button>
        </article>

    </div>
  )
}

export default CreateCampaign