"use client"
import { BackDrop, Editor, RequestDocumentAccess, ShareBox } from '@/components';
import { allowedToView } from '@/store/atoms/allowedToView';
import { currentdocument } from '@/store/atoms/currentdocument';
import { peoplewithaccess } from '@/store/atoms/peoplewithaccess';
import { requestediton } from '@/store/atoms/requestediton';
import { resValue1 } from '@/store/atoms/resValue1';
import { resValue2 } from '@/store/atoms/resValue2';
import { sharehomeon } from '@/store/atoms/sharehomeon';
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon';
import { shareprevopen } from '@/store/atoms/shareprevopen';
import { sharesettingson } from '@/store/atoms/sharesettingson';
import { sharevieweron } from '@/store/atoms/sharevieweron';
import { yourrole } from '@/store/atoms/yourrole';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { io } from "socket.io-client";

const page = () => {
  const setPwithaccess = useSetRecoilState(peoplewithaccess)
  const setValue1 = useSetRecoilState(resValue1)
  const setValue2 = useSetRecoilState(resValue2)
  const shomeon=useRecoilValue(sharehomeon)
  const setSharevieweron=useSetRecoilState(sharevieweron)
  const svieweron=useRecoilValue(sharevieweron)
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
  const setCurrentDocument = useSetRecoilState(currentdocument)
  const setRequestedit = useSetRecoilState(requestediton)
  const requestedit=useRecoilValue(requestediton)
  const updateName = async (e:any)=>{    
    const newName = e.target.value===''?'Untitled Document':`${e.target.value}`
    let res=await axios.post('/api/renamedocument',{
      newName, roomName : id
    })
    if(res.status === 200){
      setDocumentName(res.data.newName==='Untitled Document'?'':`${res.data.newName}`)
    }
  }
  const findInPeople = (arr:any)=>{
    if(arr === undefined) return -1
    for(let i=0;i<arr.length;i++){
      if(arr[i].user.email === session?.user?.email) return i
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
const getDocumentDetails = async ()=>{
  try {
    let res = await axios.post('/api/roomdetails',{
      roomName : id
    })
    if(res.status === 200){
      console.log(res.data.document);
      console.log(res.data.getpeoplewithaccess);
      setPwithaccess(res.data.getpeoplewithaccess)
      setCurrentDocument(res.data.document)
      let ind = findInPeople(res.data.getpeoplewithaccess)
      console.log('ind', ind);
      
      if((session && res.data.document?.ownedBy?.email === session?.user?.email) || res.data.document?.share?.generalaccess?.value === "AnyOne with link" || ind !== -1){
        setAllowedtoview(true)
      }
      else{
        setAllowedtoview(false)
      }
      if(res.data.document?.share?.generalaccess?.value !== "Restricted"){
        setMyrole(res.data.document?.share?.generalaccess?.role)
      }
      if(ind !== -1 && res.data.document?.share?.generalaccess?.role !== 'Editor'){
        // console.log(res.data.getpeoplewithaccess[ind].role);
        setMyrole(res.data.getpeoplewithaccess[ind].role)
      }
      if(res.data.document?.ownedBy?.email === session?.user?.email){
        setMyrole('owner')
      }
      // console.log(res.data.document?.share?.generalaccess?.role);
      
    }
  } catch (error) {
    console.log('error', error);
  } 
  }
    useEffect(()=>{
      getDocumentDetails()
    },[session])
  return (
    <>
    {allowedtoview ? <div className='bg-slate-800'>
      <BackDrop/>
      {(shomeon || speopleaddon || ssettingson || svieweron || requestedit) && <ShareBox/>}
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
            {myrole === 'Viewer' && <p className='h-[40px] text-[0.85rem] text-slate-200 border-2 border-blue-600 hover:bg-slate-800 p-2 rounded-r-full rounded-l-full cursor-pointer mx-3' onClick={()=>setRequestedit(true)} >Request Edit access</p>}
            <div className='flex flex-row justify-center items-center bg-[#2b88eb] h-[40px] w-[100px] rounded-r-full rounded-l-full cursor-pointer hover:bg-[#165190]' onClick={()=>{
              setSharehomeon(false)
              setSharevieweron(false)
              if(myrole === 'owner' || myrole === 'Editor'){
                setSharehomeon(true)
                setShareprevopen("home")
              }
              else{
                // setSharehomeon(true)
                setSharevieweron(true)
              }
              }}>
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
              {session?.user?.name[0]}
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
