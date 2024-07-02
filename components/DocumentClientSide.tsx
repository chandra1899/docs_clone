"use client"
import { BackDrop, Editor, RequestDocumentAccess, ShareBox } from '@/components';
import { allowedToView } from '@/store/atoms/allowedToView';
import { CurrentDcoumentType, currentdocument } from '@/store/atoms/currentdocument';
import { PersonwithAccess, peoplewithaccess } from '@/store/atoms/peoplewithaccess';
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
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Socket, io } from "socket.io-client";

interface Props {
  initialData : {
    document : CurrentDcoumentType,
    getpeoplewithaccess : PersonwithAccess[]
  },
  sessionData : Session
}

const DocumentClientSide = ({initialData, sessionData} : Props) => {
    const [modeDropOn, setModeDropOn] = useState<boolean>(false)
  const [currDocMode, setCurrDocMode] = useState<string>('Edit')
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
  const [socket, setSocket] = useState<null | Socket>(null);
  const {status,data:session} =useSession()
  const router = useRouter();
  const {id} = useParams()
  const [documentName, setDocumentName] = useState<string>('');
  const documentNameRef = useRef(documentName);
  const setCurrentDocument = useSetRecoilState(currentdocument)
  const setRequestedit = useSetRecoilState(requestediton)
  const requestedit=useRecoilValue(requestediton)
  const [initialRender, setInitialRender] = useState<number>(0)

  const findInPeople = (arr:PersonwithAccess[])=>{
    for(let i=0;i<arr.length;i++){
      if(arr[i].user.email === session?.user?.email) return i
    }
    return -1
  }
  
  useEffect(()=>{
    // const s = io(`http://localhost:3001/`);
    const s = io(`https://docs-socket-server.onrender.com/`);
    setSocket(s)
    return ()=>{
      s.disconnect()
    }
  }, [])
  useEffect(()=>{
    if(currentdocumentob == undefined) return 
    setValue1(currentdocumentob.share.generalaccess.value)
    setValue2(currentdocumentob.share.generalaccess.role)
},[currentdocumentob])

const checkExpiration = (date : string) : Boolean => {
  const now = new Date();
  const isoString = now.toISOString().slice(0, 16)  
  return isoString < date
}

const getDocumentDetails = async ()=>{
  try {
    let res = await axios.post('/api/roomdetails',{
      roomName : id
    })
    if(res.status === 200){
      setDocumentName(res.data.document.documentName)
      setPwithaccess(res.data.getpeoplewithaccess)
      setCurrentDocument(res.data.document)
      let ind = findInPeople(res.data.getpeoplewithaccess)
      
      if((session && res.data.document?.ownedBy?.email === session?.user?.email) || res.data.document?.share?.generalaccess?.value === "AnyOne with link"){        
        setAllowedtoview(true)
      }
      else if(ind !== -1 && (!res.data.getpeoplewithaccess[ind].expirationOn || (res.data.getpeoplewithaccess[ind].expirationOn && checkExpiration(res.data.getpeoplewithaccess[ind].expirationDate)))){
        setAllowedtoview(true)
      }
      else{
        setAllowedtoview(false)
      }
      if(res.data.document?.share?.generalaccess?.value !== "Restricted"){
        setMyrole(res.data.document?.share?.generalaccess?.role)
      }
      if(ind !== -1 && res.data.document?.share?.generalaccess?.role !== 'Editor'){
        setMyrole(res.data.getpeoplewithaccess[ind].role)
      }
      if(res.data.document?.ownedBy?.email === session?.user?.email){
        setMyrole('owner')
      }
    }
  } catch (error) {
    console.log('error', error);
  } 
  }
  const handleprint = () => {
    window.print();
  }

  useEffect(() => {
    if(initialRender >= 2) return ;
    
    setDocumentName(initialData.document.documentName)
    setPwithaccess(initialData.getpeoplewithaccess)
    setCurrentDocument(initialData.document)

    let ind = -1
    let arr = initialData.getpeoplewithaccess
    
      for(let i=0;i<arr.length;i++){
        if(arr[i].user.email === sessionData?.user?.email){
          ind = i
          break ;
        }
      }
    
    if((sessionData && initialData.document.ownedBy.email === sessionData?.user?.email) || initialData.document.share.generalaccess.value === "AnyOne with link"){
      setAllowedtoview(true)
    }
    else if(ind !== -1 && (!initialData.getpeoplewithaccess[ind].expirationOn || (initialData.getpeoplewithaccess[ind].expirationOn && checkExpiration(initialData.getpeoplewithaccess[ind].expirationDate)))){
      setAllowedtoview(true)
    }
    else{
      setAllowedtoview(false)
    }
    if(initialData.document.share.generalaccess.value !== "Restricted"){
      setMyrole(initialData.document.share.generalaccess.role)
    }
    if(ind !== -1 && initialData.document.share.generalaccess.role !== 'Editor'){
      setMyrole(initialData.getpeoplewithaccess[ind].role)
    }
    if(initialData.document.ownedBy.email === sessionData?.user?.email){
      setMyrole('owner')
    }
  }, [])

  useEffect(() => {
    documentNameRef.current = documentName;
  }, [documentName]);

  useEffect(() => {
      if(!session) return ;
      const interval = setInterval(async () => {
        
        const newName = documentNameRef.current === ''?'Untitled Document':documentNameRef.current
        try {
          await axios.post('/api/renamedocument',{
            newName, roomName : id
          })          
        } catch (error) {
            console.log('error in updating name');
        }
      }, 1500)
      return () => {
        clearInterval(interval)
      }
  }, [session])

    useEffect(()=>{
        if(!session) return ;
        if(initialRender < 2){
          setInitialRender((pre) => pre + 1)
            return ;
        }
        getDocumentDetails()
    },[session])

    return (
        <>
        {allowedtoview ? <div className='bg-slate-800'>
          <BackDrop/>
          {(shomeon || speopleaddon || ssettingson || svieweron || requestedit) && <ShareBox/>}
          <div className="document_nav flex flex-row justify-between items-center h-[70px] bg-black sticky top-0 z-[2]">
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
            value = {documentName}
            onChange={e => setDocumentName(e.target.value)}
            placeholder='document Name'
            className='bg-black w-auto border-none outline-none'
             />
            <div className='flex flex-row justify-between items-center text-[0.9rem]'>
                <p className='mr-3 hover:text-blue-600 cursor-pointer' onClick={handleprint}>Print</p>
                <div className='mr-3 relative' tabIndex={0} onBlur={() => setModeDropOn(false)} >
                <div className='flex flex-row justify-center items-center cursor-pointer rounded-lg hover:text-blue-600 p-2 text-[0.9rem]' onClick={()=>{if(myrole === 'Viewer') return ;setModeDropOn((pre:any)=>!pre)}}>
                    <p className={`${myrole === 'Viewer'?'text-slate-400 cursor-default':''}`} >mode</p>
                </div>
                {modeDropOn && <div className='absolute flex flex-col justify-center items-center p-2 bg-black mr-4 rounded-lg text-[0.8rem] w-[100px]'>
                <div className='flex flex-row justify-center items-center w-[100%] '>
                        <div className='flex justify-start items-center h-[30px] w-[30px]'>
                            {currDocMode === "View" && <Image
                            src="/tick.png"
                            width={20}
                            height={20}
                            alt="tick"
                            className="cursor-pointer"
                            />}
                        </div>
                        <p className='my-1 cursor-pointer hover:bg-slate-700 p-1 px-2 flex justify-center items-center rounded-l-full rounded-r-full' onClick={()=>{setCurrDocMode('View');setModeDropOn(false)}} >View</p>
                    </div>
                <div className='flex flex-row justify-center items-center w-[100%] '>
                        <div className='flex justify-start items-center h-[30px] w-[30px]'>
                            {currDocMode === "Edit" && <Image
                            src="/tick.png"
                            width={20}
                            height={20}
                            alt="tick"
                            className="cursor-pointer"
                            />}
                        </div>
                        <p className='my-1 cursor-pointer hover:bg-slate-700 p-1 px-2 flex justify-center items-center rounded-l-full rounded-r-full' onClick={()=>{setCurrDocMode('Edit');setModeDropOn(false)}}>Edit</p>
                    </div>
                </div>}
            </div>
                <p className='mr-3 hover:text-blue-600 cursor-pointer'>Extensions</p>
                <p className='mr-3 hover:text-blue-600 cursor-pointer'>help</p>
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
                  {session?.user?.name && session?.user?.name[0]}
        </div>
            </div>
          </div>
            <Editor socket = {socket} currDocMode = {currDocMode} />
        </div> :
        <RequestDocumentAccess/>
        }
        </>
      )
}

export default DocumentClientSide
