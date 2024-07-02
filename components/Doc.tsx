"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import DocOptions from './DocOptions'
import { YourDocuments } from '@/store/atoms/yourDocuments'

interface Props {
  document : YourDocuments
}

const Doc = ({document}:Props) => {  
  const {status,data:session} =useSession()
  const router = useRouter();
  return (
    <div className='flex flex-row items-center justify-between w-[800px] text-[0.8rem] font-normal my-1 h-[40px] hover:bg-slate-900 rounded-l-full rounded-r-full' >
      <div className='flex flex-row items-center justify-start w-[220px] cursor-pointer' 
      onClick={()=>{router.push(`/document/${document?.roomName}`)}} >
      <Image
        src="/docs_img.png"
        width={28}
        height={28}
        alt="docs_img"
        className="mr-5"
      />
      <p>{document?.documentName}</p>
      </div>
      <p className='w-[220px] flex items-center justify-center'>{(document?.ownedBy.email === session?.user?.email)?'me':`${document.ownedBy.email}`}</p>
      <p className='w-[220px] flex items-center justify-center'>{document?.updatedAt}</p>
      <DocOptions roomName = {document?.roomName} ownerEmail = {document.ownedBy.email} />
    </div>
  )
}

export default Doc
