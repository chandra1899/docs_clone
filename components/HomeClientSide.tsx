"use client"
import { YourDocs } from "@/components";
import { currentdocument } from "@/store/atoms/currentdocument";
import { yourDocuments } from "@/store/atoms/yourDocuments";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const HomeClientSide = ({initialData, sessionData} : any) => {
    const {status,data:session} =useSession()
  const setYourDocuments=useSetRecoilState(yourDocuments)
  if(initialData.documents != undefined){
    setYourDocuments(initialData.documents)
  }
  const setCurrentDocument = useSetRecoilState(currentdocument)
  const router = useRouter();
    const generateRandomCharactors = ()=>{
      let allChar="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomCharactors = "";

      for(let i=0;i<15;i++){
          let randomNum = Math.floor(Math.random() * allChar.length);
          randomCharactors+=allChar[randomNum];
      }
      return randomCharactors
    }
    const createNewDocument =async ()=>{
        const roomName = generateRandomCharactors();
        let email=session?.user?.email
        if(!email) return ;
        let res=await axios.post('/api/createDocument',{
          email,roomName,
        })
        if(res.status === 200){
          router.push(`/document/${roomName}`);
        }
    }

    useEffect(()=>{
      setCurrentDocument(undefined)
    },[])

  return (
    <>
        <div className="flex flex-row justify-between items-center h-[50px]">
        <div className="flex flex-row relative items-center">
        <Image
        src="/docs_img.png"
        width={35}
        height={35}
        alt="docs_img"
        className="ml-3 cursor-pointer"
        onClick={()=>{router.push(`/`);}}
      />
      <p className="ml-4 font-semibold mt-1">DOCS</p>
        </div>
    <div className="flex flex-row relative items-center">
      <Image
      src="/search.png"
      width={21}
      height={21}
      alt="search"
      className="absolute ml-3"
    />

      <input
       type="text" 
       placeholder="Search"
       className={`bg-transparent h-[80%] w-[50vw] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-12  rounded-lg outline-none focus:border-[#8228f0] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
       />
    </div>
    <div className="flex flex-row justify-center items-center" onClick={async()=>{await signOut()}} >
      <Image
        src="/logout.png"
        width={30}
        height={30}
        alt="search"
        className="mr-2 cursor-pointer"
      />
      <p className="text-red-600 hover:text-red-700 cursor-pointer">Sign Out</p>
    </div>
    <div className="flex flex-row justify-center items-center  rounded-full h-[80%] w-[60px] bg-[#6029e1] mr-5 text-[1.5rem] font-mono">
      f
    </div>
      </div>
      <div>
        <div className="bg-slate-900 h-[200px] flex flex-col justify-center items-center">
          <p className="">Start a new document</p>
          <div>
            <div className="h-[100px] w-[110px] my-4 flex justify-center items-center bg-black cursor-pointer hover:border-2 hover:border-slate-800" onClick={createNewDocument} >
            <Image
                src="/plus.png"
                width={50}
                height={50}
                alt="plus"
                className="absolute"
              />
            </div>
            <p className="text-[0.8rem] ml-2 font-normal">Blank document</p>
          </div>
        </div>
      </div>
      <YourDocs/>
    </>
  )
}

export default HomeClientSide
