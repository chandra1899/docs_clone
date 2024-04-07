"use client"
import { BackDrop, Editor, RequestDocumentAccess, ShareBox } from '@/components';
import { allowedToView } from '@/store/atoms/allowedToView';
import { currentdocument } from '@/store/atoms/currentdocument';
import { resValue1 } from '@/store/atoms/resValue1';
import { resValue2 } from '@/store/atoms/resValue2';
import { sharehomeon } from '@/store/atoms/sharehomeon';
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon';
import { shareprevopen } from '@/store/atoms/shareprevopen';
import { sharesettingson } from '@/store/atoms/sharesettingson';
import { yourrole } from '@/store/atoms/yourrole';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { io } from "socket.io-client";

const page = () => {
  const setValue1 = useSetRecoilState(resValue1)
  const setValue2 = useSetRecoilState(resValue2)
  const shomeon=useRecoilValue(sharehomeon)
  const speopleaddon=useRecoilValue(sharepeopleaddon)
  const ssettingson=useRecoilValue(sharesettingson)
  const setSharehomeon=useSetRecoilState(sharehomeon)
  const setShareprevopen=useSetRecoilState(shareprevopen)
  const currentdocumentob=useRecoilValue(currentdocument)
  const [allowedtoview, setAllowedtoview] = useRecoilState(allowedToView)
  const [myrole, setMyrole] = useRecoilState(yourrole)
  const [socket, setSocket] = useState();
  const {status,data:session} =useSession()
  const router = useRouter();
  const {id} = useParams()
  const [documentName, setDocumentName] = useState('');

  const updateName = async (e:any)=>{    
    const newName = e.target.value===''?'Untitled Document':`${e.target.value}`
    let res=await axios.post('/api/renamedocument',{
      newName, roomName : id
    })
    if(res.status === 200){
      setDocumentName(res.data.newName==='Untitled Document'?'':`${res.data.newName}`)
    }
  }
  const findInPeople = ()=>{
    let arr = currentdocumentob?.share?.peoplewithaccess
    if(arr === undefined) return -1
    for(let i=0;i<arr.length;i++){
      if(arr[i].email === session?.user?.email) return i
    }
    return -1
  }
  
  useEffect(()=>{
    const s = io("http://localhost:3001/");
    setSocket(s)
    return ()=>{
      s.disconnect()
    }
  }, [])
  useEffect(()=>{
    setValue1(currentdocumentob?.share?.generalaccess?.value)
    setValue2(currentdocumentob?.share?.generalaccess?.role)
},[currentdocumentob])
useEffect(()=>{
  let ind = findInPeople()
  if((session && currentdocumentob && currentdocumentob?.ownedBy?.email === session?.user?.email) || currentdocumentob?.share?.generalaccess?.value === "AnyOne with link" || ind !== -1){
    setAllowedtoview(true)
  }
  else{
    setAllowedtoview(false)
  }
  if(currentdocumentob?.share?.generalaccess?.value !== "Restricted"){
    setMyrole(currentdocumentob?.share?.generalaccess?.role)
  }
  if(ind !== -1 && myrole !== 'Editor'){
    setMyrole(currentdocumentob?.share?.peoplewithaccess[ind].role)
  }
  if(currentdocumentob?.ownedBy?.email === session?.user?.email){
    setMyrole('owner')
  }
    
},[session, currentdocumentob])
  return (
    <>
    {allowedtoview ? <div className='bg-slate-800'>
      <BackDrop/>
      {(shomeon || speopleaddon || ssettingson) && <ShareBox/>}
      <div className="document_nav flex flex-row justify-between items-center h-[50px] bg-black sticky top-0 z-[1]">
        <div className="flex flex-row relative items-center">
        <Image
        src="/docs_img.png"
        width={48}
        height={48}
        alt="docs_img"
        className="ml-3 cursor-pointer"
        onClick={()=>{router.push(`/`);}}
      />
      <div className='flex flex-col justify-center ml-3 font-normal'>
        <input 
        type="text"
        // value = {documentName===""?`Untitled document`:`${documentName}`}
        value = {documentName}
        onChange={updateName}
        placeholder='document Name'
        className='bg-black w-auto'
         />
        <div className='flex flex-row justify-between items-center text-[0.9rem]'>
            <p className='mr-3'>File</p>
            <p className='mr-3'>Edit</p>
            <p className='mr-3'>View</p>
            <p className='mr-3'>Extensions</p>
        </div>
      </div>
        </div>
        <div className='flex flex-row justify-center items-center'>
            <div className='flex flex-row justify-center items-center bg-[#2b88eb] h-[40px] w-[100px] rounded-r-full rounded-l-full cursor-pointer hover:bg-[#165190]' onClick={()=>{setSharehomeon(true);setShareprevopen("home")}}>
            <Image
              src="/lock.png"
              width={25}
              height={25}
              alt="lock"
              className="mr-1"
            />
                <p className='mt-1'>Share</p>
            </div>
        <div className="flex flex-row justify-center items-center rounded-full h-[80%] w-[60px] bg-[#6029e1] mx-6 text-[1.5rem] font-mono">
      f
    </div>
        </div>
      </div>
        <Editor socket = {socket} />
    </div> :
    <RequestDocumentAccess/>
    }
    </>
  )
}

export default page
