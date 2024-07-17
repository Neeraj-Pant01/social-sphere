import React from 'react'

const OnlineUser = () => {
  return (
    <div className='flex gap-2 items-center'>
      <div className='w-[35px] relative h-[35px] rounded-full'>
        <img src='https://media.istockphoto.com/id/1191834325/photo/woman-with-index-finger-on-lips-asking-to-be-quiet-or-keep-secret.jpg?s=612x612&w=0&k=20&c=w-5MBbMc8E96QJDY3x3xpXFj5omg5qTI7DLrUtu-UTk=' className='rounded-full h-[35px] w-[35px]' />
        <div className="absolute right-0 bottom-1 bg-[green] w-[10px] h-[10px] rounded-full"></div>
      </div>
      <b>username</b>
    </div>
  )
}

export default OnlineUser
