"use client"
import { currentdocument } from '@/store/atoms/currentdocument'
import { yourrole } from '@/store/atoms/yourrole'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

const AccessEmailView = ({peopleob}:any)=>{
    const [dropOn, setDropon] = useState(false)
    const [value, setValue] = useState(peopleob.role)
    const [expiration, setExpiration] = useState(peopleob.expirationOn)
    const [expirationDate, setExpirationDate] = useState(peopleob.expirationDate)
    const {id : roomName} = useParams()
    const myrole = useRecoilValue(yourrole)
    const currentdocumentob=useRecoilValue(currentdocument)
    
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowISOString = tomorrow.toISOString().slice(0, 16);
    const handleChangeDate =async (e:any)=>{
        const currentDate = new Date().toISOString().slice(0, 16);
        if(e.target.value <= currentDate) return 
        let res = await axios.post('/api/sharepeoplechange',{
            role : value, _id : peopleob._id, expirationOn : expiration, expirationDate : e.target.value
        })
        if(res.status === 200){
            setExpirationDate(e.target.value)
        }
    }
    const handlechange =async  (role : String)=>{
        // const {role, expirationOn, expirationDate, _id}=await req.json()
        let res = await axios.post('/api/sharepeoplechange',{
            role, _id : peopleob._id, expirationOn : expiration, expirationDate
        })
        if(res.status === 200){
            setValue(role)
            setDropon(false)
        }
    }
    const handleexpirationOn =async ()=>{
        let res = await axios.post('/api/sharepeoplechange',{
            role : value, _id : peopleob._id, expirationOn : !expiration, expirationDate
        })
        if(res.status === 200){
            setExpiration((pre:any)=>!pre)
            setDropon(false)
        }
    }
    const handleremoveaccess =async (e)=>{
        // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
        
        let res = await axios.post('/api/removeaccess',{
            _id : peopleob._id, roomName
        })
        if(res.status === 200){
            e.target.parentNode.parentNode.parentNode.parentNode.classList.add('hidden')
        }
    }
    return (
        <div className='flex flex-col '>
            <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center my-2'>
            <div className='h-[35px] w-[35px] flex justify-center items-center rounded-full bg-[#fb9c2f] text-[1.3rem] mr-3'>{peopleob?.user?.name[0]}</div>
            <div >
                <p className='text-[0.95rem]'>{peopleob?.user?.name}</p>
                <p className='text-[0.8rem] font-normal text-blue-800'>{peopleob?.user?.email}</p>
            </div>
        </div>
        {(myrole === 'Viewer' || (myrole === 'Editor' && currentdocumentob?.settings?.s1 === false)) ? <p className='text-slate-300 text-[0.9rem] mr-6'>{value}</p> :
                    <div className='mr-4 relative'>
                    <div className='flex flex-row justify-center items-center cursor-pointer rounded-lg hover:bg-slate-800 p-2 text-[0.9rem]' onClick={()=>setDropon((pre)=>!pre)}>
                        <p >{value}</p>
                        <Image
                            src="/dropdown.png"
                            width={20}
                            height={20}
                            alt="dropdown"
                            className="cursor-pointer mx-2"
                        />
                    </div>
                    {dropOn && <div className='z-10 absolute flex flex-col justify-center items-center p-4 bg-slate-800 ml-9 rounded-lg text-[0.8rem] w-[160px]'>
                        <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{handlechange('Viewer')}}>Viewer</p>
                        <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center border-b-2 border-blue-800 pb-2' onClick={()=>{handlechange('Editor')}}>Editor</p>
                        <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{handleexpirationOn()}}>{expiration?`Remove Expiration`:`Add Expiration`}</p>
                        <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={handleremoveaccess} >Remove access</p>
                    </div>}
                </div>}
        
        </div>
           {expiration && <div className='flex flex-row justify-center items-center'>
                <p className='text-[0.8rem] font-normal mr-2'>access expires</p>
                {(myrole === 'Viewer' || (myrole === 'Editor' && currentdocumentob?.settings?.s1 === false)) ? <p className='text-slate-300 text-[0.7rem] ml-3'>{expirationDate}</p> :
                    <input 
                    value={expirationDate}
                    onChange={handleChangeDate}
                    type="datetime-local" 
                    className='bg-[#555] border-none px-2 rounded-lg text-[0.8rem]'
                    />}
                
            </div>}
        </div>
    )
}

export default AccessEmailView
