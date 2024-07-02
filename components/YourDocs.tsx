"use client"
import React from 'react'
import { Doc } from '.'
import { useRecoilValue } from 'recoil'
import { yourDocuments } from '@/store/atoms/yourDocuments'

const YourDocs = () => {
  const documents=useRecoilValue(yourDocuments)
  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='text-[0.8rem] font-normal flex flex-row w-[800px] my-4 items-center justify-start'>
        <p className='w-[220px] flex items-center justify-center mr-8'>Files</p>
        <p className='w-[220px] flex items-center justify-center mr-7'>Owned by anyone</p>
        <p className='w-[220px] flex items-center justify-center pr-4'>Last opende by me</p>
      </div>
      {documents.map((document)=>(
        <Doc document = {document}/>
      ))}
    </div>
  )
}

export default YourDocs
