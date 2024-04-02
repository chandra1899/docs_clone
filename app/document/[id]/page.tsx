"use client"
import { Editor } from '@/components';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const page = () => {
  const [arrivalContent, setArrivalContent] = useState(null);  
  const [socket, setSocket] = useState();
  const {status,data:session} =useSession()
  const {id} = useParams()
  const [value, setValue] = useState('');
  const [documentName, setDocumentName] = useState('');
  const fetchDetailOfRoom =async ()=>{
    let res=await axios.post('/api/roomdetails',{
      roomName : id,
    })
    if(res.status === 200){
      // console.log(res);
      
      setValue(res.data.document.content)
      setDocumentName(res.data.document.documentName)
    }
  }
  const updateName = async (e:any)=>{    
    const newName = e.target.value===''?'Untitled Document':`${e.target.value}`
    let res=await axios.post('/api/renamedocument',{
      newName, roomName : id
    })
    if(res.status === 200){
      setDocumentName(res.data.newName==='Untitled Document'?'':`${res.data.newName}`)
    }
  }
  const socketFunction=async ()=>{
    let email=session?.user?.email
    if(!email) return ;
    await socket.emit('joinRoom', id,email);
    await socket.on("connect", async () => {
        console.log("SOCKET CONNECTED!", socket.id);
      });

      socket.on('changed', function (data) {
        setArrivalContent(data)
      });

      socket.on('error', function (data) {
        console.log(data || 'error');
      });

      socket.on('connect_failed', function (data) {
        console.log(data || 'connect_failed');
      });
    }

  useEffect(()=>{
    socketFunction()
  },[session,socket])
  useEffect(()=>{
    fetchDetailOfRoom()
  },[session])
  useEffect(() => {
    arrivalContent && setValue(arrivalContent)
  }, [arrivalContent]);

  useEffect(()=>{
    const s = io("http://localhost:3001/");
    setSocket(s)
    return ()=>{
      s.disconnect()
    }
  }, [])

  return (
    <div className='bg-slate-900'>
      <div className="document_nav flex flex-row justify-between items-center h-[50px] bg-black">
        <div className="flex flex-row relative items-center">
        <Image
        src="/docs_img.png"
        width={48}
        height={48}
        alt="docs_img"
        className="ml-3"
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
            <div className='flex flex-row justify-center items-center bg-[#2b88eb] h-[40px] w-[100px] rounded-r-full rounded-l-full cursor-pointer hover:bg-[#165190]'>
                Share
            </div>
        <div className="flex flex-row justify-center items-center rounded-full h-[80%] w-[60px] bg-[#6029e1] mx-6 text-[1.5rem] font-mono">
      f
    </div>
        </div>
      </div>
        <Editor value = {value} setValue = {setValue} socket = {socket} />
    </div>
  )
}

export default page
