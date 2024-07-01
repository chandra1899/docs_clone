"use client"
import Image from 'next/image'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { resValue1 } from '@/store/atoms/resValue1'
import { resValue2 } from '@/store/atoms/resValue2'
import DropDown from './DropDown'
import GeneralAccessDropDown from './GeneralAccessDropDown'
import { yourrole } from '@/store/atoms/yourrole'
import { currentdocument } from '@/store/atoms/currentdocument'

const GeneralAccess = () => {
    const Value1 = useRecoilValue(resValue1)
    const Value2 = useRecoilValue(resValue2)
    const myrole = useRecoilValue(yourrole)
    const currentdocumentob=useRecoilValue(currentdocument)
  return (
    <div>
      <p className='font-medium mt-2'>General access</p>
      <div className='flex flex-row justify-start items-center ml-2 my-2 '>
                    {Value1 ==='Restricted' && <Image
                    src="/lock.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-[#555] rounded-full p-1"
                />}
                    {Value1 === 'In this Organisation' && <Image
                    src="/organisation.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-blue-700 rounded-full p-1"
                />}
                    {Value1 ==='AnyOne with link' && <Image
                    src="/globe.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-green-600 rounded-full p-1"
                />}
                <div className='ml-1'>
                    {(myrole === 'Viewer' || (myrole === 'Editor' && currentdocumentob?.settings.s1 === false)) ? <p className='text-slate-300 text-[0.9rem] ml-3'>{Value1}</p> :
                    <GeneralAccessDropDown/>}
                    {Value1 ==='Restricted' && <p className='text-[0.8rem] font-normal ml-3'>Only people with access can open with the link</p>}
                    {Value1 === 'In this Organisation' && <p className='text-[0.8rem] font-normal ml-3'>Anyone in this group with the link can view</p>}
                    {Value1 ==='AnyOne with link' && <p className='text-[0.8rem] font-normal ml-3'>Anyone on the internet with the link can view</p>}
                </div>
                {(Value1 !=='Restricted' && (myrole === 'owner' || (myrole === 'Editor' && currentdocumentob?.settings.s1 === true))) ?  <DropDown/> :Value1 !=='Restricted'? 
                <p className='text-slate-300 text-[0.9rem] ml-3'>{Value2}</p>:''}
      </div>
      </div>
  )
}

export default GeneralAccess
