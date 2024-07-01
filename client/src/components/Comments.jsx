import React from 'react'
import { AiFillDelete, AiOutlineDislike, AiOutlineStar } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

const Comments = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col mb-3'>
        <div className="flex items-center gap-2">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnFf6DXcgRxe71BOQm1orHpnKjJloo9c2jg&s' alt='' className='w-[35px] h-[35px] rounded-full' onClick={()=>navigate('/profile/123')}/>
        <p className='text-[grey]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium labore magni amet asperiores voluptatem, architecto impedit modi sunt eius eum.</p>
        </div>
      <div className='flex items-center justify-between px-10'>
        <div className='flex items-center gap-2'>
            <AiOutlineStar className='text-xl font-bold' />
            1k
        </div>
        <div className='flex gap-2 items-center'>
            <AiOutlineDislike className='text-xl font-bold'/>
            report
        </div>
        <div className='flex items-center'>
            <AiFillDelete className='text-[tomato] text-xl font-bold' />
        </div>
      </div>
    </div>
  )
}

export default Comments
