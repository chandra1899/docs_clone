import { sharehomeon } from '@/store/atoms/sharehomeon'
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon'
import { shareprevopen } from '@/store/atoms/shareprevopen'
import { sharesettingson } from '@/store/atoms/sharesettingson'
import Image from 'next/image'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const ShareSettings = () => {
    const setSharehomeon=useSetRecoilState(sharehomeon)
    const setSpeopleaddon=useSetRecoilState(sharepeopleaddon)
    const setSsettingson=useSetRecoilState(sharesettingson)
    const sprevopen=useRecoilValue(shareprevopen)
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
                <p className='text-[1.2rem] font-medium ml-3'>Settings for "sfdfgdfg"</p>
            </div>
      </div>
      <div className='ml-4 mt-3'>
        <input id='s1' 
        type="checkbox"
        className='mx-3 my-2 h-[15px] w-[18px] cursor-pointer'
         />
        <label htmlFor="s1">Editors can change permissions and share
        </label>
      </div>
      <div className='ml-4 mt-3'>
        <input id='s2' 
        type="checkbox" 
        className='mx-3 my-2 h-[15px] w-[18px] cursor-pointer'
        />
        <label htmlFor="s2">Viewers and commenters can see the option to download, print, and copy</label>
      </div>
    </div>
  )
}

export default ShareSettings
