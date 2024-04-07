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
import { useRecoilValue, useSetRecoilState } from 'recoil'
import GeneralAccess from './GeneralAccess'

const AccessEmailView = ({peopleob}:any)=>{
    const [dropOn, setDropon] = useState(false)
    const [value, setValue] = useState(peopleob.role)
    const [expiration, setExpiration] = useState(peopleob.expirationOn)
    const [expirationDate, setExpirationDate] = useState(peopleob.expirationDate)
    const {id : roomName} = useParams()
    
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
            {/* <select id="myDropdown" className='bg-black hover:bg-slate-800 rounded-lg h-[40px] w-[80px] text-[0.8rem] cursor-pointer flex justify-center items-center px-2'>
                <option value="option1">Editor</option>
                <option value="option2">viewer</option>
                <option value="option3">Add expiration</option>
                <option value="option3">remove access</option>
                <button>add expiration</button>
            </select> */}
        </div>
        </div>
           {expiration && <div className='flex flex-row justify-center items-center'>
                <p className='text-[0.8rem] font-normal mr-2'>access expires</p>
                <input 
                value={expirationDate}
                onChange={handleChangeDate}
                type="datetime-local" 
                className='bg-[#555] border-none px-2 rounded-lg text-[0.8rem]'
                />
            </div>}
        </div>
    )
}

const DropDown = ({value, resValue1, handlechange, dropOn, setDropon} : any)=>{
    return (
        <div className='mx-4 relative'>
            <div className='flex flex-row justify-center items-center cursor-pointer rounded-lg hover:bg-slate-800 p-2 text-[0.9rem]' onClick={()=>setDropon((pre:any)=>!pre)}>
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
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{handlechange(resValue1, 'Viewer')}}>Viewer</p>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{handlechange(resValue1, 'Editor')}}>Editor</p>
            </div>}
        </div>
    )
}

const ShareHome = () => {
    const {id : roomName} = useParams()
    const setShareprevopen=useSetRecoilState(shareprevopen)
    const setSpeopleaddon=useSetRecoilState(sharepeopleaddon)
    const semail=useRecoilValue(shareemail)
    const currentdocumentob=useRecoilValue(currentdocument)
    const {id} = useParams()
    const [resValue1, setResValue1] = useState('')
    const [resValue2, setResValue2] = useState('')
    const [dropOn1, setDropon1] = useState(false)
    const [dropOn2, setDropon2] = useState(false)
    const setSharesettingson=useSetRecoilState(sharesettingson)
    const setShareemail=useSetRecoilState(shareemail)
    const setSharehomeon=useSetRecoilState(sharehomeon)
    const handleCopiedClick=()=>{
        navigator.clipboard.writeText(`http://localhost:8000/document/${id}`);
      }
      const handlechange =async (generalaccessValue:String, generalaccessRole:String)=>{
        let res = await axios.post('/api/homechange',{
            generalaccessValue, generalaccessRole, roomName
        })
        if(res.status === 200){
            setDropon1(false)
            setDropon2(false)
            setResValue1(generalaccessValue)
            setResValue2(generalaccessRole)
        }
    }
    useEffect(()=>{
        setResValue1(currentdocumentob?.share?.generalaccess?.value)
        setResValue2(currentdocumentob?.share?.generalaccess?.role)
    },[currentdocumentob])
  return (
    <div className='pl-4'>
      <div className='h-[35px] flex justify-between items-center'>
        <p className='text-[1.7rem] font-medium'>Share "sfdfgdfg"</p>
        <Image
        src="/settings.png"
        width={35}
        height={35}
        alt="settings"
        className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
        onClick={()=>{setSharehomeon(false);setSharesettingson(true)}}
      />
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
      <div>
      <p className='font-medium mt-2'>General access</p>
      <div className='flex flex-row justify-start items-center ml-2 my-2 '>
                    {resValue1 ==='Restricted' && <Image
                    src="/lock.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-[#555] rounded-full p-1"
                />}
                    {resValue1 === 'In this Organisation' && <Image
                    src="/organisation.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-blue-700 rounded-full p-1"
                />}
                    {resValue1 ==='AnyOne with link' && <Image
                    src="/globe.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-green-600 rounded-full p-1"
                />}
                <div className='ml-1'>
                    <GeneralAccess value = {resValue1} setValue = {setResValue2} handlechange = {handlechange} dropOn = {dropOn1} setDropon = {setDropon1} />
                    {resValue1 ==='Restricted' && <p className='text-[0.8rem] font-normal ml-3'>Only people with access can open with the link</p>}
                    {resValue1 === 'In this Organisation' && <p className='text-[0.8rem] font-normal ml-3'>Anyone in this group with the link can view</p>}
                    {resValue1 ==='AnyOne with link' && <p className='text-[0.8rem] font-normal ml-3'>Anyone on the internet with the link can view</p>}
                </div>
                {resValue1 !=='Restricted' && <DropDown value = {resValue2} setValue = {setResValue2} handlechange = {handlechange} dropOn = {dropOn2} setDropon = {setDropon2} resValue1 = {resValue1} />}
      </div>
      </div>
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
