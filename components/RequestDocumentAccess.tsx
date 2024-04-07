import { useSession } from "next-auth/react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import React from 'react'

const RequestDocumentAccess = () => {
    const {status,data:session} =useSession()
    const router = useRouter()
  return (
    <div className='flex flex-row justify-center items-center mt-20'>
      <div className='flex flex-col justify-start items-center w-[30vw] '>
        <div className='flex flex-row justify-start items-center w-[100%] cursor-pointer' onClick={()=>{router.push('/')}}>
            <Image
            src="/docs_img.png"
            width={43}
            height={43}
            alt="docs_img"
            className="cursor-pointer"
            />
            <p className='text-slate-300 ml-2 text-[1.25rem]'>Docs</p>
        </div>
        <p className='w-[100%] flex justify-start items-center text-[1.3rem] font-medium my-4'>You need access</p>
        <p className='w-[100%] flex justify-start items-center text-slate-200 text-[0.85rem] font-medium mb-2'>Request access, or switch to an account with access.</p>
        <textarea 
        placeholder='Message (optinal)'
            className={`bg-transparent h-[120px] w-[100%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#8228f0] focus:border-[0.1rem] focus:border-solid  font-medium my-3`}
        ></textarea>
        <div className='w-[100%] flex flex-row justify-start items-center my-2'>
        <p className='bg-blue-600 h-[40px] p-2 hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full'>Request access</p>
        </div>
        <div className='mt-6 flex flex-col justify-center items-center'>
            <p className='text-slate-200 text-[0.9rem] font-medium mb-2'>You're signed in as</p>
            <p className='text-slate-200 text-[0.9rem] font-normal p-2 rounded-l-full rounded-r-full border-2 border-blue-700 hover:bg-slate-800'>{session?.user?.email}</p>
        </div>
      </div>
      <div>
        <Image
            src="/lock2.png"
            width={300}
            height={300}
            alt="lock2"
            className="cursor-pointer"
        />
      </div>
    </div>
  )
}

export default RequestDocumentAccess
