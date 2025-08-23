import React from 'react'

interface IInput {
    text: string;
    containerStyles?: string;
    inputStyles?: string;
    inputPlaceholder: string;
    labelId: string;
}

export const InputComp = ({ text, containerStyles, inputStyles, inputPlaceholder, labelId }: IInput) => {

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
            />
       </aside>
    )
}

// className = 'w-full p-[10px] rounded-[10px] border-[1px] '

export const Inputs = () => {
  return (
    <div className='flex w-full items-center gap-[15px]'>
          <InputComp
            inputPlaceholder='enter campaign title' 
            text='Title:'
            containerStyles='w-[50%]'
          />
          <InputComp
            inputPlaceholder='enter campaign description'
            text='Description:'
            containerStyles='w-[50%]'
          />
    </div>
  )
}
