import React from 'react'
import ShareHome from './ShareHome'
import SharePeople from './SharePeople'

const ShareBox = () => {
  return (
    <div className='absolute w-[80vh] max-w-[600px] bg-black z-10 top-16 left-[32%] rounded-lg p-5 pb-8'>
      {/* <ShareHome/> */}
      <SharePeople/>
    </div>
  )
}

export default ShareBox