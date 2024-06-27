"use client"
import { requestediton } from '@/store/atoms/requestediton'
import { sharehomeon } from '@/store/atoms/sharehomeon'
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon'
import { sharesettingson } from '@/store/atoms/sharesettingson'
import { sharevieweron } from '@/store/atoms/sharevieweron'
import React from 'react'
import { useRecoilValue } from 'recoil'

const BackDrop = () => {
  const shomeon=useRecoilValue(sharehomeon)
  const speopleaddon=useRecoilValue(sharepeopleaddon)
  const ssettingson=useRecoilValue(sharesettingson)
  const svieweron=useRecoilValue(sharevieweron)
  const requestedit=useRecoilValue(requestediton)
  return (
    <>
       {(shomeon || speopleaddon || ssettingson || svieweron || requestedit) && <div className='bg-gray-900 bg-opacity-70  h-[110vh] w-[110vw] z-[1] fixed top-0' ></div>}
    </>
  )
}

export default BackDrop
