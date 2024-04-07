"use client"
import Image from 'next/image'
import React from 'react'

const GeneralAccess = ({value, handlechange, dropOn, setDropon}:any)=>{
    return (
        <div className='mr-4 relative'>
            <div className='flex flex-row justify-start items-center cursor-pointer rounded-lg hover:bg-slate-800 p-2 text-[0.9rem]' onClick={()=>setDropon((pre:any)=>!pre)}>
                <p className='ml-2' >{value}</p>
                <Image
                    src="/dropdown.png"
                    width={20}
                    height={20}
                    alt="dropdown"
                    className="cursor-pointer mx-2"
                />
            </div>
            {dropOn && <div className='z-10 absolute flex flex-col justify-start items-center py-2 pl-3 bg-slate-800  rounded-lg text-[0.9rem] w-[190px]'>
                <div className='flex flex-row justify-start items-center w-[100%] '>
                    <div className='flex justify-start items-center h-[30px] w-[30px]'>
                        {value === "Restricted" && <Image
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
                    {value === "In this Organisation" && <Image
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
                    {value === "AnyOne with link" && <Image
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

export default GeneralAccess
