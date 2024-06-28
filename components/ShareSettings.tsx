"use client"
import { currentdocument } from '@/store/atoms/currentdocument'
import { sharehomeon } from '@/store/atoms/sharehomeon'
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon'
import { shareprevopen } from '@/store/atoms/shareprevopen'
import { sharesettingson } from '@/store/atoms/sharesettingson'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const ShareSettings = () => {
  const {id : roomName} = useParams()
    const setSharehomeon=useSetRecoilState(sharehomeon)
    const setSpeopleaddon=useSetRecoilState(sharepeopleaddon)
    const setSsettingson=useSetRecoilState(sharesettingson)
    const sprevopen=useRecoilValue(shareprevopen)
    const currdocument=useRecoilValue(currentdocument)
    const [s1, setS1] = useState(currdocument?.settings?.s1)
    const [s2, setS2] = useState(currdocument?.settings?.s2)
    const handlechange =async (s1:Boolean, s2:Boolean)=>{
      // console.log(e.target.checked );
      let res = await axios.post('/api/changesettings',{
        s1, s2, roomName
      })
      if(res.status === 200){
        setS1(s1)
        setS2(s2)
      }
      
    }
  return (
    <div>
        <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-center items-center'>
                <Image
                    src="/left_arrow.png"
                    width={35}
                    height={40}
                    alt="left_arrow"
                    className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
                    onClick={()=>{
                        if(sprevopen == "home") setSharehomeon(true)
                        else setSpeopleaddon(true)
                        setSsettingson(false)
                    }}
                />
                <p className='text-[1.2rem] font-medium ml-3'>Settings for "{currdocument.documentName}"</p>
            </div>
      </div>
      <div className='ml-4 mt-3'>
        <input id='s1' 
        type="checkbox"
        checked = {s1}
        onChange={()=>{handlechange(!s1,s2)}}
        className='mx-3 my-2 h-[15px] w-[18px] cursor-pointer'
         />
        <label htmlFor="s1">Editors can change permissions and share
        </label>
      </div>
      <div className='ml-4 mt-3'>
        <input id='s2' 
        type="checkbox" 
        checked = {s2}
        onChange={()=>{handlechange(s1,!s2)}}
        className='mx-3 my-2 h-[15px] w-[18px] cursor-pointer'
        />
        <label htmlFor="s2">Viewers and commenters can see the option to download, print, and copy</label>
      </div>
    </div>
  )
}

export default ShareSettings
