"use client"
import { dropOn1 } from '@/store/atoms/dropOn1'
import { dropOn2 } from '@/store/atoms/dropOn2'
import { resValue1 } from '@/store/atoms/resValue1'
import { resValue2 } from '@/store/atoms/resValue2'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const GeneralAccessDropDown = ()=>{
    const {id : roomName} = useParams()
    const [Value1, setValue1] = useRecoilState(resValue1)
    const  setValue2 = useSetRecoilState(resValue2)
    const [drop1, setDrop1] = useRecoilState(dropOn1)
    const setDrop2 = useSetRecoilState(dropOn2)
    const handlechange =async (generalaccessValue:String, generalaccessRole:String)=>{
        let res = await axios.post('/api/homechange',{
            generalaccessValue, generalaccessRole, roomName
        })
        if(res.status === 200){
            setDrop1(false)
            setDrop2(false)
            setValue1(generalaccessValue)
            setValue2(generalaccessRole)
        }
    }
    return (
        <div className='mr-4 relative'>
            <div className='flex flex-row justify-start items-center cursor-pointer rounded-lg hover:bg-slate-800 p-2 text-[0.9rem]' onClick={()=>setDrop1((pre:any)=>!pre)}>
                <p className='ml-2' >{Value1}</p>
                <Image
                    src="/dropdown.png"
                    width={20}
                    height={20}
                    alt="dropdown"
                    className="cursor-pointer mx-2"
                />
            </div>
            {drop1 && <div className='z-10 absolute flex flex-col justify-start items-center py-2 pl-3 bg-slate-800  rounded-lg text-[0.9rem] w-[190px]'>
                <div className='flex flex-row justify-start items-center w-[100%] '>
                    <div className='flex justify-start items-center h-[30px] w-[30px]'>
                        {Value1 === "Restricted" && <Image
                        src="/tick.png"
                        width={30}
                        height={30}
                        alt="tick"
                        className="cursor-pointer"
                        />}
                    </div>
                    <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-start items-center border-b-2 border-blue-800 pb-2' onClick={()=>{handlechange('Restricted', 'Viewer')}}>Restricted</p>
                </div>
                <div className='flex flex-row justify-start items-center w-[100%]'>
                    <div className='flex justify-start items-center h-[30px] w-[30px]'>
                    {Value1 === "In this Organisation" && <Image
                        src="/tick.png"
                        width={30}
                        height={30}
                        alt="tick"
                        className="cursor-pointer"
                        />}
                    </div>
                    <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-start items-center border-b-2 border-blue-800 pb-2' onClick={()=>{handlechange('In this Organisation', 'Viewer')}}>In this Organisation</p>
                </div>
                <div className='flex flex-row justify-start items-center w-[100%]'>
                    <div className='flex justify-start items-center h-[30px] w-[30px]'>
                    {Value1 === "AnyOne with link" && <Image
                        src="/tick.png"
                        width={30}
                        height={30}
                        alt="tick"
                        className="cursor-pointer"
                        />}
                    </div>
                    <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-start items-center' onClick={()=>{handlechange('AnyOne with link', 'Viewer')}}>AnyOne with link</p>
                </div>                
            </div>}
        </div>
    )
}

export default GeneralAccessDropDown
