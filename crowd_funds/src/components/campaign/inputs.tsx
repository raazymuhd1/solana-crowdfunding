import React from 'react'

const Inputs = () => {
  return (
    <div className='flex w-full items-center gap-[15px]'>
        <aside className='flex w-[50%] flex-col gap-[2px]'>
            <label htmlFor="title" className='font-medium '>Title:</label>
            <input id="title" type="text" placeholder='enter campaign title' className='w-full p-[10px] rounded-[10px] border-[1px] ' />
        </aside>
          <aside className='flex w-[50%] flex-col gap-[2px]'>
            <label htmlFor="desc" className='font-medium '>Description:</label>
            <input id="desc" type="text" placeholder='enter campaign title' className='w-full p-[10px] rounded-[10px] border-[1px] ' />
        </aside>
    </div>
  )
}

export default Inputs