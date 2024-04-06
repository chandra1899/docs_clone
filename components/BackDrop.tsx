"use client"
import { sharehomeon } from '@/store/atoms/sharehomeon'
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon'
import { sharesettingson } from '@/store/atoms/sharesettingson'
import React from 'react'
import { useRecoilValue } from 'recoil'

const BackDrop = () => {
  const shomeon=useRecoilValue(sharehomeon)
  const speopleaddon=useRecoilValue(sharepeopleaddon)
  const ssettingson=useRecoilValue(sharesettingson)
  return (
    <>
       {(shomeon || speopleaddon || ssettingson) && <div className='bg-gray-900 bg-opacity-70  h-[110vh] w-[110vw] z-[1] absolute top-0' ></div>}
    </>
  )
}

export default BackDrop
