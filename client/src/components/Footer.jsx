import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#dddada1d] mt-4 px-3 py-4 font-bold text-[black] flex flex-col'>
      <b className='text-lg text-[#324AB2]'>socialSphere</b>
      <div className="flex flex-col mt-3">
        <span className='text-[grey] text-sm'>HELP</span>
        <span className='text-[grey] text-sm'>CONTACT</span>
        <span className='text-[grey] text-sm'>OUR TEAM</span>
        <span className='text-[grey] text-sm'>LOGOUT</span>
      </div>
    </div>
  )
}

export default Footer
