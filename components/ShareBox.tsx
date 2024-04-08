"use client"
import React, { useEffect } from 'react'
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
import { currentdocument } from '@/store/atoms/currentdocument'
import { sharevieweron } from '@/store/atoms/sharevieweron'
import { requestediton } from '@/store/atoms/requestediton'

const ShareBox = () => {
  const shomeon=useRecoilValue(sharehomeon)
  const speopleaddon=useRecoilValue(sharepeopleaddon)
  const ssettingson=useRecoilValue(sharesettingson)
  const svieweron = useRecoilValue(sharevieweron)
  const myrole = useRecoilValue(yourrole)
  const requestedit=useRecoilValue(requestediton)
  const currentdocumentob = useRecoilValue(currentdocument)
  return (
    <div className='absolute w-[80vh] max-w-[600px] bg-black z-10 top-16 left-[32%] rounded-lg p-5 pb-8'>
      {(myrole === 'Editor' || myrole === 'owner') && shomeon && <ShareHome/>}
      {speopleaddon && <SharePeople/>}
      {myrole === 'owner' && ssettingson && <ShareSettings/>}
      {(myrole === 'Viewer' || (myrole === 'Editor' && currentdocumentob?.settings?.s1 === false)) && svieweron && <ViewerHome/>}
      {requestedit && <RequestEditAccess/>}
    </div>
  )
}

export default ShareBox