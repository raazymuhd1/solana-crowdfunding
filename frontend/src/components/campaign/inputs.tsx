import { Dispatch, SetStateAction } from 'react'
import type { CampaignDetails } from '@/types'

interface IInput {
    text: string;
    containerStyles?: string;
    inputStyles?: string;
    inputPlaceholder: string;
    labelId: string;
    campaignDetails: CampaignDetails;
    setCampaignDetails: Dispatch<SetStateAction<CampaignDetails>>;
    handleChange: () => void;
    updateField: string;

}

export const Inputs = ({ text, containerStyles, inputStyles, inputPlaceholder, labelId, campaignDetails, setCampaignDetails, updateField, handleChange }: IInput) => {

    return (
        <aside className={`${containerStyles} flex flex-col gap-[2px]`}>
            <label 
                htmlFor={labelId} 
                className='font-medium '> 
                {text} 
            </label>
            <input 
                id={labelId} 
                type="text" 
                placeholder={inputPlaceholder} 
                className={`${inputStyles} w-full p-[10px] rounded-[10px] border-[1px]`}
                onChange={(e) => {
                  console.log(`field ${updateField}`)

                  setCampaignDetails({
                    ...campaignDetails, [updateField]: e.target.value
                  })
                }} 
            />
       </aside>
    )
}

