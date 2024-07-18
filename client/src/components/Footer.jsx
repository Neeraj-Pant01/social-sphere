import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[rgba(0,0,0,0.7)] mt-8 px-3 py-4 font-bold text-[black] flex flex-col'>
      <b className='text-lg text-[white]'>socialSphere</b>
      <div className="flex flex-col mt-3">
        <span className='text-[lightgrey] text-sm'>HELP</span>
        <span className='text-[lightgrey] text-sm'>CONTACT</span>
        <span className='text-[lightgrey] text-sm'>OUR TEAM</span>
        <span className='text-[lightgrey] text-sm'>LOGOUT</span>
      </div>
    </div>
  )
}

export default Footer
