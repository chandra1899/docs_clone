"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

const DocOptions = ({roomName} : any) => {
    console.log('roomname', roomName);
    
    const [modeDropOn, setModeDropOn] = useState(false)

    const handleDeleteDoc =async (e : any) => {
        try {
            let res = await axios.post('/api/deletedocument',{
                roomName
              })
            if(res.status === 200){
                console.log('deleted doc');
                e.target.parentElement.parentElement.parentElement.parentElement.classList.add('hidden')
            }
        } catch (error) {
            console.log('error in deleting document', error);
        }
    }

  return (
    <div className='mr-3 relative' tabIndex={0} onBlur={() => setModeDropOn(false)
    } >
                <div className='flex flex-row justify-center items-center cursor-pointer rounded-lg hover:text-blue-600 p-2 text-[0.9rem]' onClick={()=>{setModeDropOn((pre:any)=>!pre)}}>
                    <Image
                        src="/dot_menu.png"
                        width={28}
                        height={28}
                        alt="dot_menu"
                        className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
                    />
                </div>
                {modeDropOn && <div className='absolute flex flex-col justify-center items-center bg-black top-5 left-11 rounded-lg text-[0.8rem] w-[90px] border-[1px] border-slate-600 '>
                <div className='flex flex-row justify-center items-center w-[100%] rounded-lg hover:bg-slate-900' onClick={handleDeleteDoc} >
                        <div className='flex justify-center items-center h-[30px] w-[30px]'>
                            {<Image
                            src="/delete.png"
                            width={20}
                            height={20}
                            alt="tick"
                            className="cursor-pointer mb-1"
                            />}
                        </div>
                        <p className='my-1 cursor-pointer text-red-600 p-1 flex justify-center items-center rounded-l-full rounded-r-full' >Delete</p>
                    </div>
                </div>}
            </div>
  )
}

export default DocOptions
