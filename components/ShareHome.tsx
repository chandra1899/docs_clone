"use client"
import { currentdocument } from '@/store/atoms/currentdocument'
import { shareemail } from '@/store/atoms/shareemail'
import { sharehomeon } from '@/store/atoms/sharehomeon'
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon'
import { shareprevopen } from '@/store/atoms/shareprevopen'
import { sharesettingson } from '@/store/atoms/sharesettingson'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { AccessEmailView, GeneralAccess } from '.'
import { resValue2 } from '@/store/atoms/resValue2'
import { resValue1 } from '@/store/atoms/resValue1'
import { dropOn1 } from '@/store/atoms/dropOn1'
import { dropOn2 } from '@/store/atoms/dropOn2'
import { yourrole } from '@/store/atoms/yourrole'



const ShareHome = () => {
    const setShareprevopen=useSetRecoilState(shareprevopen)
    const setSpeopleaddon=useSetRecoilState(sharepeopleaddon)
    const semail=useRecoilValue(shareemail)
    const currentdocumentob=useRecoilValue(currentdocument)
    const {id} = useParams()
    const setSharesettingson=useSetRecoilState(sharesettingson)
    const setShareemail=useSetRecoilState(shareemail)
    const setSharehomeon=useSetRecoilState(sharehomeon)
    const myrole = useRecoilValue(yourrole)
    const handleCopiedClick=()=>{
        navigator.clipboard.writeText(`http://localhost:8000/document/${id}`);
      }
      
    
  return (
    <div className='pl-4'>
      <div className='h-[35px] flex justify-between items-center'>
        <p className='text-[1.7rem] font-medium'>Share "sfdfgdfg"</p>
        {myrole === 'owner' && <Image
        src="/settings.png"
        width={35}
        height={35}
        alt="settings"
        className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
        onClick={()=>{setSharehomeon(false);setSharesettingson(true)}}
      />}
      </div>
      <div className='flex items-center justify-center my-4'>
        <input 
        type="text" 
        placeholder='add people with email'
        className={`bg-transparent h-[40px] w-[70%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-2 focus:border-solid font-medium my-2`}
        value={semail}
        onChange={(e:any)=>{setShareemail(e.target.value)}}
        />
        <button className='h-[40px] w-[50px] flex justify-center items-center bg-green-600 hover:bg-green-700 rounded-lg mx-4' onClick={()=>{
            setShareprevopen("people")
            setSharehomeon(false)
            setSpeopleaddon(true)
        }}>
            <Image
                src="/arrow_right.png"
                width={35}
                height={35}
                alt="arrow_right"
                // className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
            />
        </button>
      </div>
      <div>
        <p className='font-medium'>People with access</p>
        {/* display owner */}
        <div className='flex flex-col '>
            <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center my-2'>
            <div className='h-[35px] w-[35px] flex justify-center items-center rounded-full bg-[#fb9c2f] text-[1.3rem] mr-3'>{currentdocumentob?.ownedBy?.name
[0]}</div>
            <div >
                <p className='text-[0.95rem] text-violet-600'>{currentdocumentob?.ownedBy?.name}</p>
                <p className='text-[0.8rem] font-normal text-blue-800'>{currentdocumentob?.ownedBy?.email}</p>
            </div>
        </div>
        <div className='mr-4 relative'>
            <div className='flex flex-row justify-center items-center cursor-pointer rounded-lg hover:bg-slate-800 p-2 text-[0.9rem]' >
                <p className='text-slate-400'>Owner</p>
            </div>
        </div>
        </div>
           
        </div>
        {currentdocumentob?.share?.peoplewithaccess?.map((peopleob:any)=>(
            <AccessEmailView peopleob = {peopleob} />
        ))}
      </div>

      <GeneralAccess />

      <div className='flex flex-row justify-between items-center mx-2'>
        <div className='flex flex-row justify-center items-center border-2 border-blue-600 rounded-l-full rounded-r-full p-1 px-3 h-[40px] hover:bg-slate-800 cursor-pointer my-4' onClick={handleCopiedClick} >
            <Image
                    src="/link.png"
                    width={28}
                    height={28}
                    alt="copy link"
                    // className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
                />
            <p className='font-medium ml-2 text-[0.9rem]'>Copy link</p>
        </div>
        <p className='bg-blue-600 hover:bg-blue-700 cursor-pointer h-[40px] w-[80px] rounded-l-full rounded-r-full flex justify-center items-center font-medium' onClick={()=>{setSharehomeon(false)}}>Done</p>
      </div>
    </div>
  )
}

export default ShareHome
