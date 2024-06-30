"use client"
import React, { useState } from 'react'
import GeneralAccess from './GeneralAccess'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { shareemail } from '@/store/atoms/shareemail'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { sharevieweron } from '@/store/atoms/sharevieweron'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { message } from '@/store/atoms/message'
import { currentdocument } from '@/store/atoms/currentdocument'

const ViewerHome = () => {
  const setMsg=useSetRecoilState(message)
  const msg = useRecoilValue(message)
  const currentdocumentob = useRecoilValue(currentdocument)
  const {data:session} = useSession()
  const {id} = useParams()
  const [ask, setAsk] = useState(false)
  const [semail, setEmail]=useRecoilState(shareemail)
  const setSvieweron = useSetRecoilState(sharevieweron)
  const setSharevieweron = useSetRecoilState(sharevieweron)
  const handleCopiedClick=()=>{
    navigator.clipboard.writeText(`${process.env.NEXTJS_URL}/document/${id}`);
  }
  const handlesend =async ()=>{
    try {
      let res = await axios.post('/api/sendlink',{
        from : session?.user?.email,
        to : semail,
        msg, 
        roomName : id
      })
      if(res.status === 200){
        setMsg('')
        setEmail('')
        setSharevieweron(false)
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  const handleask =async ()=>{
    try {
      let res = await axios.post('/api/asktosharefile',{
        from : session?.user?.email,
        // @ts-ignore
        to : currentdocumentob?.ownedBy.email,
        msg, 
        roomName : id,
        email : semail
      })
      if(res.status === 200){
        setMsg('')
        setEmail('')
        setSharevieweron(false)
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <div>
        {ask ? <p className='text-[1.3rem] font-medium'>Ask owner to share ‘{
          // @ts-ignore
        currentdocumentob.documentName}’</p>:
        <p className='text-[1.3rem] font-medium'>Send the link for ‘{// @ts-ignore
          currentdocumentob.documentName}’</p>}
        {ask ? <p className='text-[0.75rem] font-normal text-slate-300 my-2'>You're a viewer and can't manage access</p>:
        <p className='text-[0.75rem] font-normal text-slate-300 my-2'>You'll send an email with the link from below</p>}
        <input 
        placeholder='email or group'
        type="text" 
        value={semail}
        onChange={(e)=>setEmail(e.target.value)}
        className={`bg-transparent h-[80%] w-[100%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#8228f0] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
        />
        <textarea 
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
        placeholder='Message'
            className={`bg-transparent h-[150px] w-[100%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#8228f0] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
        ></textarea>
        <GeneralAccess/>
        <div className='flex flex-row justify-between items-center mt-4'>
          <div className='flex flex-row justify-center items-center ml-2'>
          <Image
                src="/link.png"
                width={35}
                height={35}
                alt="link"
                className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
                onClick={handleCopiedClick}
            />
            {!ask && <button className='text-[0.85rem] text-blue-600 font-medium h-[40px] p-2 rounded-l-full rounded-r-full hover:bg-slate-800 hover:border-2 hover:border-blue-600 ml-2' onClick={()=>setAsk(true)} >ssk to share</button>}
          </div>
          <div className='flex flex-row justify-center items-center'>
                <p className='text-blue-600 h-[40px] w-[80px] hover:bg-slate-800 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full mx-3' onClick={()=>{setSvieweron(false);setEmail('')}}
                >cancel</p>
               {ask ? <p className='bg-blue-600 h-[40px] w-[80px] hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full' onClick={handleask} >Ask</p> :
                <p className='bg-blue-600 h-[40px] w-[80px] hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full' onClick={handlesend}>Send</p>}
            </div>
        </div>
    </div>
  )
}

export default ViewerHome
