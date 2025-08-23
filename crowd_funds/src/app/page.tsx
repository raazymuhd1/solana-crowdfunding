import { CampaignLists } from "@/components"

export default function Home() {
  return (
      <div className="w-[90%] flex flex-col gap-[20px] mx-auto mt-[40px] border-[1px] rounded-[15px]"> 
          <div className="flex flex-col p-[15px] gap-[15px] items-center">
            <h2 
              className='font-extrabold text-[clamp(1.5rem,1.3vw,2rem)]'> Active Campaigns </h2>
            <p 
              className='font-normal text-[clamp(12px,1vw,16px)]'> select the available campaign & donate to support {":)"} </p>
          </div>

          <hr className="w-full" /> 

          <CampaignLists />
      </div>
  )
}
