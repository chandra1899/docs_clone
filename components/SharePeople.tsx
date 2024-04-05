import Image from 'next/image'
import React from 'react'

const SharePeople = () => {
  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row justify-center items-center'>
        <Image
            src="/left_arrow.png"
            width={35}
            height={40}
            alt="left_arrow"
            className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
        />
        <p className='text-[1.2rem] font-medium ml-3'>Share "sfdfgdfg"</p>
        </div>
        <Image
            src="/settings.png"
            width={35}
            height={35}
            alt="settings"
            className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
        />
      </div>
      <div className='flex flex-row justify-around items-center'>
        <p className='text-[0.9rem] text-slate-300 font-medium rounded-lg border-2 border-blue-600 w-[60%] h-[50px] flex justify-center my-3 items-center'>chandra091827@gmail.com</p>
        <select id="myDropdown" className='bg-black hover:bg-slate-800 rounded-lg h-[40px] w-[80px] text-[0.8rem] cursor-pointer flex justify-center items-center px-2'>
                <option value="option1">Editor</option>
                <option value="option2">viewer</option>
                <option value="option3">Add expiration</option>
                <option value="option3">remove access</option>
            </select>
      </div>
      <input id='notify' className='mx-3 my-2 h-[18px] w-[18px] cursor-pointer' type="checkbox" />
      <label htmlFor="notify" className='text-[0.9rem] font-normal'>Notify people</label>
      <textarea className='bg-black text-white w-[90%] rounded-xl border-2 border-blue-600 h-[150px] p-3 ml-4 my-4' placeholder='Message' name="" id=""></textarea>
      <div className='flex flex-row justify-between items-center mx-4'>
        <Image
                src="/link.png"
                width={35}
                height={35}
                alt="link"
                className="cursor-pointer hover:bg-slate-800 rounded-full p-1"
            />
            <div className='flex flex-row justify-center items-center'>
                <p className='text-blue-600 h-[40px] w-[80px] hover:bg-slate-800 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full mx-3'>cancel</p>
                <p className='bg-blue-600 h-[40px] w-[80px] hover:bg-blue-700 cursor-pointer border-2 border-blue-600 flex justify-center items-center rounded-l-full rounded-r-full'>Send</p>
            </div>
      </div>
    </div>
  )
}

export default SharePeople
