"use client"
import { currentdocument } from "@/store/atoms/currentdocument"
import { message } from "@/store/atoms/message"
import { requestediton } from "@/store/atoms/requestediton"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

const RequestEditAccess = () => {
  const {data:session} = useSession()
  const {id:roomName} = useParams()
  const setRequestedit = useSetRecoilState(requestediton)
  const currentdocumentob = useRecoilValue(currentdocument)
  const [msg, setMsg] = useRecoilState(message)
  const handlesend = async ()=>{
    try {
      let res = await axios.post('/api/requesteditaccess', {
        from : session?.user?.email, 
        to : currentdocumentob?.ownedBy?.email,
        msg,
        roomName
      })
      if(res.status === 200){
        setRequestedit(false)
      }
    } catch (error) {
      console.log('error', error);
      
    }
  }
  return (
    <div >
      <p className='text-[1.25rem] font-medium'>Ask owner to be an editor for ‘Untitled fghj’</p>
      <textarea 
      value={msg}
      onChange={(e)=>setMsg(e.target.value)}
        placeholder='Message'
            className={`bg-transparent h-[150px] w-[100%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#8228f0] focus:border-[0.1rem] focus:border-solid  font-medium my-3`}
        ></textarea>
        <div className='flex flex-row justify-end items-center mt-3'>
                <p className='text-blue-600 h-[40px] w-[80px] hover:bg-slate-800 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full mx-3'
                 onClick={()=>setRequestedit(false)}>cancel</p>
               <p className='bg-blue-600 h-[40px] w-[80px] hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full' onClick={handlesend}>Send</p>
            </div>
    </div>
  )
}

export default RequestEditAccess
