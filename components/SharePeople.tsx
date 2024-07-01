"use client"
import { currentdocument } from '@/store/atoms/currentdocument'
import { message } from '@/store/atoms/message'
import { peoplewithaccess } from '@/store/atoms/peoplewithaccess'
import { shareemail } from '@/store/atoms/shareemail'
import { sharehomeon } from '@/store/atoms/sharehomeon'
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon'
import { shareprevopen } from '@/store/atoms/shareprevopen'
import { sharesettingson } from '@/store/atoms/sharesettingson'
import { yourrole } from '@/store/atoms/yourrole'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

interface Props2 {
    expiration : boolean,
    setExpiration : React.Dispatch<React.SetStateAction<boolean>>,
    value : string,
    setValue : React.Dispatch<React.SetStateAction<string>>
}

const DropDown = ({expiration, setExpiration, value, setValue}:Props2)=>{
    const [dropOn, setDropon] = useState<boolean>(false)
    return (
        <div className='mr-4 relative' tabIndex={0} onBlur={() => setDropon(false)}>
            <div className='flex flex-row justify-center items-center cursor-pointer rounded-lg hover:bg-slate-800 p-2 text-[0.9rem]' onClick={()=>setDropon((pre=>!pre))}>
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
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{setValue('Viewer');setDropon(false)}}>Viewer</p>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center border-b-2 border-blue-800 pb-2' onClick={()=>{setValue('Editor');setDropon(false)}}>Editor</p>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{setExpiration(
                  (pre)=>!pre);setDropon(false)}}>{expiration?`Remove Expiration`:`Add Expiration`}</p>
            </div>}
        </div>
    )
}

const SharePeople = () => {
    const setShareprevopen=useSetRecoilState(shareprevopen)
    const setSharehomeon=useSetRecoilState(sharehomeon)
    const setSpeopleaddon=useSetRecoilState(sharepeopleaddon)
    const setSsettingson=useSetRecoilState(sharesettingson)
    const setShareemail=useSetRecoilState(shareemail)
    const setPeoplewithaccess=useSetRecoilState(peoplewithaccess)
    const setMsg=useSetRecoilState(message)
    const msg = useRecoilValue(message)
    const currentdocumentob = useRecoilValue(currentdocument)
    const semail = useRecoilValue(shareemail)
    const myrole = useRecoilValue(yourrole)
    const {id} = useParams()
    const [notifyOn, setNotifyOn] = useState<boolean>(true)
    const [role, setRole] = useState<string>("Viewer")
    const [expiration, setExpiration] = useState<boolean>(true)
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowISOString = tomorrow.toISOString().slice(0, 16);
    const [expirationDate, setExpirationDate] = useState(tomorrowISOString)
    const handleCopiedClick=()=>{
        navigator.clipboard.writeText(`${process.env.NEXTJS_URL}/document/${id}`);
      }
      const handleDateChange = (e:any)=>{
        const currentDate = new Date().toISOString().slice(0, 16);
        
        if(e.target.value <= currentDate) return 
        setExpirationDate(e.target.value)
        
      }
    const handleShare =async ()=>{
      if(semail == "") return 
      let res=await axios.post(`/api/createshare`,{
        email : semail,
        role,
        expirationOn : expiration,
        expirationDate ,
        roomName : id,
        notify : notifyOn,
        msg 
      })
      if(res.status === 200 && res?.data?.people != undefined){
        let insert = res?.data?.people
        setPeoplewithaccess((prev) => [...prev, insert])
        setShareemail("")
        setSpeopleaddon(false)
        setSharehomeon(true)
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
                setShareprevopen("home")
                setSpeopleaddon(false)
                setSharehomeon(true)
                setShareemail("")
            }}
        />
        <p className='text-[1.2rem] font-medium ml-3'>Share "{currentdocumentob?.documentName}"</p>
        </div>
        {myrole === 'owner' && <Image
            src="/settings.png"
            width={35}
            height={35}
            alt="settings"
            className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
            onClick={()=>{setSpeopleaddon(false);setSsettingson(true)}}
        />}
      </div>
      <div className='flex flex-row justify-between items-center ml-4'>
        <p className='text-[0.9rem] text-slate-300 font-medium rounded-lg border-2 border-blue-600 w-[60%] h-[50px] flex justify-start pl-3 my-3 items-center'>{semail}</p>
        <DropDown expiration = {expiration} setExpiration = {setExpiration} value = {role} setValue = {setRole} />
      </div>
        {expiration && <div className='flex flex-row justify-start items-center ml-4'>
                <p className='text-[0.8rem] font-normal mr-2'>access expires</p>
                <input 
                value={expirationDate}
                type="datetime-local" 
                className='bg-[#555] border-none px-2 rounded-lg text-[0.8rem]'
                onChange={handleDateChange}
                />
        </div>}
      <input id='notify'
       className='mx-3 my-2 h-[18px] w-[18px] cursor-pointer'
       type="checkbox"
       checked={notifyOn}
       onChange={()=>setNotifyOn((pre)=>!pre)}
         />
      <label htmlFor="notify" className='text-[0.9rem] font-normal'>Notify people</label>
      {notifyOn && <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} className='bg-black text-white w-[90%] rounded-xl border-2 border-blue-600 h-[150px] p-3 ml-4 my-4' placeholder='Message' name="" id=""></textarea>}
      <div className={`flex flex-row justify-between items-center mx-4 ${notifyOn?``:`mt-5`}`}>
        <Image
                src="/link.png"
                width={35}
                height={35}
                alt="link"
                className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
                onClick={handleCopiedClick}
            />
            <div className='flex flex-row justify-center items-center'>
                <p className='text-blue-600 h-[40px] w-[80px] hover:bg-slate-800 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full mx-3'
                onClick={()=>{
                    setShareprevopen("home")
                    setSpeopleaddon(false)
                    setSharehomeon(true)
                    setShareemail("")
                }}
                >cancel</p>
               <p className='bg-blue-600 h-[40px] w-[80px] hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full' onClick={handleShare} >{notifyOn?`Share`: `Send`}</p>
            </div>
      </div>
    </div>
  )
}

export default SharePeople
