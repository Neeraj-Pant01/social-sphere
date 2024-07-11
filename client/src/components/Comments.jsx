import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiOutlineDislike, AiOutlineStar } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { getUser } from '../utils/userRequest';
import { useSelector } from 'react-redux';

const Comments = ({c}) => {
    const navigate = useNavigate();
    const [user, setuser] = useState()

    const token = useSelector((state) => state.user.currentUser.token)

    useEffect(()=>{
      const getCommentUser = async () =>{
        const response = await getUser(token, c?.userId)
        setuser(response.data)
      }
      getCommentUser();
    },[c?.userId])
  return (
    <div className='flex flex-col mb-3'>
        <div className="flex items-center gap-2">
        <img src={user?.profilePic || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719792000&semt=ais_user"} alt='' className='w-[35px] h-[35px] rounded-full' onClick={()=>navigate('/profile/123')}/>
        <p className='text-[grey]'>{c.comment}.</p>
        </div>
      <div className='flex items-center justify-between px-10'>
        <div className='flex items-center gap-2'>
            <AiOutlineStar className='text-xl font-bold' />
            {c.likes.length}
        </div>
        <div className='flex gap-2 items-center'>
            <AiOutlineDislike className='text-xl font-bold'/>
            {
              c.reports.length
            }
        </div>
        <div className='flex items-center relative'>
            <AiFillDelete className='text-[tomato] text-xl font-bold' />
        </div>
      </div>
    </div>
  )
}

export default Comments
