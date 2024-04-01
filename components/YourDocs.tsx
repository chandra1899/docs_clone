"use client"
import React from 'react'
import { Doc } from '.'
import { useRecoilValue } from 'recoil'
import { yourDocuments } from '@/store/atoms/yourDocuments'

const YourDocs = () => {
  const documents=useRecoilValue(yourDocuments)
  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='text-[0.8rem] font-normal flex flex-row w-[800px] my-4 items-center justify-between'>
        <p className='w-[300px] flex items-center justify-center pr-4'>Files</p>
        <p>Owned by anyone</p>
        <p >Last opende by me</p>
      </div>
      {documents.map((document)=>(
        <Doc document = {document}/>
      ))}
    </div>
  )
}

export default YourDocs
