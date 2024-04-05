import Image from 'next/image'
import React, { useState } from 'react'

const AccessEmailView = ()=>{
    const [dropOn, setDropon] = useState(false)
    const [value, setValue] = useState('')
    const [expiration, setExpiration] = useState(false)
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowISOString = tomorrow.toISOString().slice(0, 16);
    return (
        <div className='flex flex-col '>
            <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center my-2'>
            <div className='h-[35px] w-[35px] flex justify-center items-center rounded-full'>f</div>
            <div >
                <p className='text-[0.95rem]'>chandra</p>
                <p className='text-[0.8rem] font-normal text-slate-300'>chandra@gmail.com</p>
            </div>
        </div>
        <div className='mr-4 relative'>
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
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{setExpiration((pre)=>!pre);setDropon(false)}}>{expiration?`Remove Expiration`:`Add Expiration`}</p>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center'>Remove access</p>
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
                value={tomorrowISOString}
                type="datetime-local" 
                className='bg-[#555] border-none px-2 rounded-lg text-[0.8rem]'
                />
            </div>}
        </div>
    )
}

const GeneralAccess = ({value, setValue}:any)=>{
    const [dropOn, setDropon] = useState(false)
    return (
        <div className='mr-4 relative'>
            <div className='flex flex-row justify-start items-center cursor-pointer rounded-lg hover:bg-slate-800 p-2 text-[0.9rem]' onClick={()=>setDropon((pre=>!pre))}>
                <p className='ml-2' >{value}</p>
                <Image
                    src="/dropdown.png"
                    width={20}
                    height={20}
                    alt="dropdown"
                    className="cursor-pointer mx-2"
                />
            </div>
            {dropOn && <div className='z-10 absolute flex flex-col justify-center items-center p-2 bg-slate-800 ml-9 rounded-lg text-[0.9rem] w-[160px]'>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center border-b-2 border-blue-800 pb-2' onClick={()=>{setValue('Restricted');setDropon(false)}}>Restricted</p>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center border-b-2 border-blue-800 pb-2' onClick={()=>{setValue('In this Organisation');setDropon(false)}}>In this Organisation</p>
                <p className='my-1 cursor-pointer hover:bg-slate-700 w-[100%] p-1 flex justify-center items-center' onClick={()=>{setValue('Any one with link');setDropon(false)}}>Any one with link</p>
            </div>}
        </div>
    )
}

const ShareHome = () => {
    const [resValue, setResValue] = useState('')
  return (
    <div>
      <div className='h-[35px] flex justify-between items-center'>
        <p className='text-[1.7rem] font-medium'>Share "sfdfgdfg"</p>
        <Image
        src="/settings.png"
        width={35}
        height={35}
        alt="settings"
        className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
      />
      </div>
      <div className='flex items-center justify-center my-4'>
        <input 
        type="text" 
        placeholder='add people with email'
        className={`bg-transparent h-[40px] w-[70%] border-[#4125f1] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-2 focus:border-solid font-medium my-2`}
        />
        <button className='h-[40px] w-[50px] flex justify-center items-center bg-green-600 hover:bg-green-700 rounded-lg mx-4'>
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
        <AccessEmailView/>
        {/* <AccessEmailView/>
        <AccessEmailView/> */}
      </div>
      <div>
      <p className='font-medium mt-2'>General access</p>
      <div className='flex flex-row justify-start items-center ml-2 my-2 '>
                    {resValue ==='Restricted' && <Image
                    src="/lock.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-[#555] rounded-full p-1"
                />}
                    {resValue === 'In this Organisation' && <Image
                    src="/organisation.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-blue-700 rounded-full p-1"
                />}
                    {resValue ==='Any one with link' && <Image
                    src="/globe.png"
                    width={28}
                    height={28}
                    alt="lock"
                    className="bg-green-600 rounded-full p-1"
                />}
                <div className='ml-1'>
                    <GeneralAccess value = {resValue} setValue = {setResValue}/>
                    {resValue ==='Restricted' && <p className='text-[0.8rem] font-normal ml-3'>Only people with access can open with the link</p>}
                    {resValue === 'In this Organisation' && <p className='text-[0.8rem] font-normal ml-3'>Anyone in this group with the link can view</p>}
                    {resValue ==='Any one with link' && <p className='text-[0.8rem] font-normal ml-3'>Anyone on the internet with the link can view</p>}
                </div>
      </div>
      </div>
      <div className='flex flex-row justify-between items-center mx-2'>
        <div className='flex flex-row justify-center items-center border-2 border-blue-600 rounded-l-full rounded-r-full p-1 px-3 h-[40px] hover:bg-slate-800 cursor-pointer my-4'>
            <Image
                    src="/link.png"
                    width={28}
                    height={28}
                    alt="copy link"
                    // className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
                />
            <p className='font-medium ml-2 text-[0.9rem]'>Copy link</p>
        </div>
        <p className='bg-blue-600 hover:bg-blue-700 cursor-pointer h-[40px] w-[80px] rounded-l-full rounded-r-full flex justify-center items-center font-medium'>Done</p>
      </div>
    </div>
  )
}

export default ShareHome
