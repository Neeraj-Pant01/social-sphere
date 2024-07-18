import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillClockCircle, AiFillSignal, AiFillVideoCamera, AiOutlineUser } from "react-icons/ai"
import { FaBookmark, FaTv, FaUsers } from "react-icons/fa";

const Sidecomponent = () => {
    const user = useSelector((state)=>state.user.currentUser)
    const navigate = useNavigate();
  return (
    <div className='hidden rounded-md md:flex flex-col gap-5 px-2 w-[300px] h-[80vh] sticky top-[80px]'>
        <Link to={`/profile/${user?._id}`} className="flex items-center px-4 font-semibold text-[black] text-md">{user.username}</Link>

        <div className="flex items-center px-4 font-semibold text-[black] gap-2 text-md" onClick={()=>navigate(`/fans/${user._id}`,{state:"fans"})}><FaUsers className='text-[blue]' />Fans </div>

        <div className="flex items-center px-4 font-semibold text-[black] gap-2 text-md"><AiFillClockCircle className='text-[#124b79]' />Memories </div>

        <div className="flex gap-2 items-center px-4 font-semibold text-[black] text-md"><FaBookmark className='text-[gold]'/>Saved </div>

        <div className="flex items-center px-4 font-semibold gap-2 text-[black] text-md"> <FaTv className='text-[maroon]' />Feeds</div>

        <div className="flex gap-2 items-center px-4 font-semibold text-[black] text-md"><AiFillSignal className='text-[#124b79]'/> Events</div>

        <div className="flex items-center px-4 font-semibold gap-2 text-[black] text-md"><AiFillVideoCamera className='text-[blue]' /> Videos</div>

        <div className='flex flex-col mt-6'>
          <b className='mb-2'>Notifications</b>
          <div className='flex items-center justify-between gap-4 mb-4'>
            <p className='text-sm text-[grey]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, fugit.</p>
            <span className='text-sm text-[grey]'>{new Date().getDate().toLocaleString()}</span>
          </div>
          <div className='flex mb-4 items-center justify-between gap-4'>
            <p className='text-sm text-[grey]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, fugit.</p>
            <span className='text-sm text-[grey]'>{new Date().getDate().toLocaleString()}</span>
          </div>
          <div className='flex mb-4 items-center justify-between gap-4'>
            <p className='text-sm text-[grey]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, fugit.</p>
            <span className='text-sm text-[grey]'>{new Date().getDate().toLocaleString()}</span>
          </div>
          <div className='flex items-center justify-between gap-4 mb-4'>
            <p className='text-sm text-[grey]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, fugit.</p>
            <span className='text-sm text-[grey]'>{new Date().getDate().toLocaleString()}</span>
          </div>
        </div>
    </div>
  )
}

export default Sidecomponent
