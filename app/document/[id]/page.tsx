"use client"
import { Editor } from '@/components';
import Image from 'next/image'

const page = () => {
  return (
    <div className='bg-slate-900'>
      <div className="flex flex-row justify-between items-center h-[50px] bg-black">
        <div className="flex flex-row relative items-center">
        <Image
        src="/docs_img.png"
        width={48}
        height={48}
        alt="docs_img"
        className="ml-3"
      />
      <div className='flex flex-col justify-center ml-3 font-normal'>
        <p className=''>Untitled document</p>
        <div className='flex flex-row justify-between items-center text-[0.9rem]'>
            <p className='mr-3'>File</p>
            <p className='mr-3'>Edit</p>
            <p className='mr-3'>View</p>
            <p className='mr-3'>Extensions</p>
        </div>
      </div>
        </div>
        <div className='flex flex-row justify-center items-center'>
            <div className='flex flex-row justify-center items-center bg-[#2b88eb] h-[40px] w-[100px] rounded-r-full rounded-l-full cursor-pointer hover:bg-[#165190]'>
                Share
            </div>
        <div className="flex flex-row justify-center items-center rounded-full h-[80%] w-[60px] bg-[#6029e1] mx-6 text-[1.5rem] font-mono">
      f
    </div>
        </div>
      </div>
        <Editor/>
    </div>
  )
}

export default page
