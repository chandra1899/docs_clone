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
import { yourrole } from '@/store/atoms/yourrole'

const ShareBox = () => {
  const shomeon=useRecoilValue(sharehomeon)
  const speopleaddon=useRecoilValue(sharepeopleaddon)
  const ssettingson=useRecoilValue(sharesettingson)
  const myrole = useRecoilValue(yourrole)
  return (
    <div className='absolute w-[80vh] max-w-[600px] bg-black z-10 top-16 left-[32%] rounded-lg p-5 pb-8'>
      {(myrole === 'Editor' || myrole === 'owner') && shomeon && <ShareHome/>}
      {speopleaddon && <SharePeople/>}
      {myrole === 'owner' && ssettingson && <ShareSettings/>}
      {(myrole === 'Viewer') && shomeon && <ViewerHome/>}
      {/* <RequestEditAccess/> */}
    </div>
  )
}

export default ShareBox