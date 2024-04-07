import React from 'react'

const RequestEditAccess = () => {
  return (
    <div >
      <p className='text-[1.25rem] font-medium'>Ask owner to be an editor for ‘Untitled fghj’</p>
      <textarea 
        placeholder='Message'
            className={`bg-transparent h-[150px] w-[100%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#8228f0] focus:border-[0.1rem] focus:border-solid  font-medium my-3`}
        ></textarea>
        <div className='flex flex-row justify-end items-center mt-3'>
                <p className='text-blue-600 h-[40px] w-[80px] hover:bg-slate-800 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full mx-3'
                >cancel</p>
               <p className='bg-blue-600 h-[40px] w-[80px] hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full'>Send</p>
            </div>
    </div>
  )
}

export default RequestEditAccess
