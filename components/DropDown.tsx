import { dropOn1 } from '@/store/atoms/dropOn1'
import { dropOn2 } from '@/store/atoms/dropOn2'
import { resValue1 } from '@/store/atoms/resValue1'
import { resValue2 } from '@/store/atoms/resValue2'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { useRecoilState } from 'recoil'

const DropDown = ()=>{
    const {id : roomName} = useParams()
    const [Value1, setValue1] = useRecoilState(resValue1)
    const [Value2, setValue2] = useRecoilState(resValue2)
    const [drop1, setDrop1] = useRecoilState(dropOn1)
    const [drop2, setDrop2] = useRecoilState(dropOn2)
    const handlechange =async (generalaccessValue:String, generalaccessRole:String)=>{
        let res = await axios.post('/api/homechange',{
            generalaccessValue, generalaccessRole, roomName
        })
        if(res.status === 200){
            setDrop1(false)
            setDrop2(false)
            setValue1(generalaccessValue)
            setValue2(generalaccessRole)
        }
    }
    return (
        <div className='mx-4 relative'>
            <div className='flex flex-row justify-center items-center cursor-pointer rounded-lg hover:bg-slate-800 p-2 text-[0.9rem]' onClick={()=>setDrop2((pre:any)=>!pre)}>
                <p >{Value2}</p>
                <Image
                    src="/dropdown.png"
                    width={20}
                    height={20}
                    alt="dropdown"
                    className="cursor-pointer mx-2"
                />
            </div>
            {drop2 && <div className='z-10 absolute flex flex-col justify-center items-center p-4 bg-slate-800 ml-9 rounded-lg text-[0.8rem] w-[160px]'>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{handlechange(Value1, 'Viewer')}}>Viewer</p>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{handlechange(Value1, 'Editor')}}>Editor</p>
            </div>}
        </div>
    )
}

export default DropDown
