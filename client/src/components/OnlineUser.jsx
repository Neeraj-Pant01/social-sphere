import React from 'react'

const OnlineUser = ({img, name}) => {
  return (
    <div className='flex gap-2 items-center'>
      <div className='w-[35px] relative h-[35px] rounded-full'>
        <img src={img} className='rounded-full h-[35px] w-[35px]' />
        <div className="absolute right-0 bottom-1 bg-[green] w-[10px] h-[10px] rounded-full"></div>
      </div>
      <b>{name}</b>
    </div>
  )
}

export default OnlineUser
