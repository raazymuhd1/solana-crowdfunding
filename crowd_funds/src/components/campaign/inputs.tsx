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
            labelId="title"
            inputPlaceholder='enter campaign title' 
            text='Title:'
            containerStyles='w-[50%]'
          />
          <InputComp
            labelId="authority"
            inputPlaceholder='enter campaign description'
            text='Campaign Authority:'
            containerStyles='w-[50%]'
          />
    </div>
  )
}
