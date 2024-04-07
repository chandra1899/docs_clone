"use client"
import React, { useState } from 'react'
import GeneralAccess from './GeneralAccess'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const ViewerHome = () => {
  const {id} = useParams()
  const [ask, setAsk] = useState(false)
  const handleCopiedClick=()=>{
    navigator.clipboard.writeText(`http://localhost:8000/document/${id}`);
  }
  return (
    <div>
        {ask ? <p className='text-[1.3rem] font-medium'>Ask owner to share ‘Untitled fghj’</p>:
        <p className='text-[1.3rem] font-medium'>Send the link for ‘Untitled fghj’</p>}
        {ask ? <p className='text-[0.75rem] font-normal text-slate-300 my-2'>You're a viewer and can't manage access</p>:
        <p className='text-[0.75rem] font-normal text-slate-300 my-2'>You'll send an email with the link from below</p>}
        <input 
        placeholder='email or group'
        type="text" 
        className={`bg-transparent h-[80%] w-[100%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#8228f0] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
        />
        <textarea 
        placeholder='Message'
            className={`bg-transparent h-[150px] w-[100%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#8228f0] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
        ></textarea>
        <GeneralAccess/>
        <div className='flex flex-row justify-between items-center mt-4'>
          <div className='flex flex-row justify-center items-center ml-2'>
          <Image
                src="/link.png"
                width={35}
                height={35}
                alt="link"
                className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
                onClick={handleCopiedClick}
            />
            {!ask && <button className='text-[0.85rem] text-blue-600 font-medium h-[40px] p-2 rounded-l-full rounded-r-full hover:bg-slate-800 hover:border-2 hover:border-blue-600 ml-2' onClick={()=>setAsk(true)} >ssk to share</button>}
          </div>
          <div className='flex flex-row justify-center items-center'>
                <p className='text-blue-600 h-[40px] w-[80px] hover:bg-slate-800 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full mx-3'
                >cancel</p>
               {ask ? <p className='bg-blue-600 h-[40px] w-[80px] hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full'>Ask</p> :
                <p className='bg-blue-600 h-[40px] w-[80px] hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full'>Send</p>}
            </div>
        </div>
    </div>
  )
}

export default ViewerHome
