"use client"
import React from 'react'
import ShareHome from './ShareHome'
import SharePeople from './SharePeople'
import ShareSettings from './ShareSettings'
import { useRecoilValue } from 'recoil'
import { sharehomeon } from '@/store/atoms/sharehomeon'
import { sharepeopleaddon } from '@/store/atoms/sharepeopleaddon'
import { sharesettingson } from '@/store/atoms/sharesettingson'
import ViewerHome from './ViewerHome'
import RequestEditAccess from './RequestEditAccess'

const ShareBox = () => {
  const shomeon=useRecoilValue(sharehomeon)
  const speopleaddon=useRecoilValue(sharepeopleaddon)
  const ssettingson=useRecoilValue(sharesettingson)
  return (
    <div className='absolute w-[80vh] max-w-[600px] bg-black z-10 top-16 left-[32%] rounded-lg p-5 pb-8'>
      {/* {shomeon && <ShareHome/>}
      {speopleaddon && <SharePeople/>}
      {ssettingson && <ShareSettings/>} */}
      {/* <ViewerHome/> */}
      {/* <RequestEditAccess/> */}
    </div>
  )
}

export default ShareBox