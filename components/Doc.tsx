import Image from 'next/image'
import React from 'react'

const Doc = () => {
  return (
    <div className='flex flex-row items-center justify-between w-[800px] text-[0.8rem] font-normal my-1 h-[40px] hover:bg-slate-900 cursor-pointer rounded-l-full rounded-r-full'>
      <div className='flex flex-row items-center justify-center w-[300px]'>
      <Image
        src="/docs_img.png"
        width={28}
        height={28}
        alt="docs_img"
        className="mr-9"
      />
      <p>name file</p>
      </div>
      <p>me</p>
      <p>84-84-4848</p>
      <Image
        src="/dot_menu.png"
        width={28}
        height={28}
        alt="dot_menu"
        className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
      />
    </div>
  )
}

export default Doc
