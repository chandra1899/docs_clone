"use client"
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
  return (
    <>
       {(shomeon || speopleaddon || ssettingson || svieweron) && <div className='bg-gray-900 bg-opacity-70  h-[110vh] w-[110vw] z-[1] absolute top-0' ></div>}
    </>
  )
}

export default BackDrop
