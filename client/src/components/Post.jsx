import React, { useState } from 'react'
import { AiFillStar, AiOutlineComment, AiOutlineStar } from 'react-icons/ai'
import { CiPaperplane } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';

const Post = () => {
    const [like, setLike] = useState(false)
    const comment = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur"
    const navigate = useNavigate();
  return (
    <div className='flex flex-col'>
      <div className='flex'>
      <div className="flex-1 flex items-center justify-center">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s' alt='post' className='rounded-md h-[150px]' />
      </div>
      <div className="flex-1 flex flex-col">
        <Link to={'/profile/123'} style={{fontFamily:"cursive"}}  className='flex items-center justify-center font-bold text-xl text-[#318CE7]'>
            Neha Adhikari
        </Link>
        <div className='flex flex-col text-center items-center justify-center text-[grey]'>
          {
            comment.substring(0,60)
          }
          <button className='mt-1 text-[black]' onClick={()=>navigate('/post/123')}>Read more...</button>
        </div>
      </div>
      </div>
      <div className='flex items-center justify-center mt-1'>
        {
            like?
            <button className='px-2 py-1 text-2xl text-[gold]' onClick={()=>setLike(!like)}><AiFillStar /></button>
            :
        <button className='px-2 py-1 text-2xl' onClick={()=>setLike(!like)}><AiOutlineStar /></button>
        }
        <span className='text-[#318CE7]'>19K</span>

        <button className='px-2 py-1 text-2xl self-end ml-10' onClick={()=>navigate('/post/123')}>
        <AiOutlineComment />
        </button>
        <span className='text-[#318CE7]'>1k</span>

        <button className='px-2 py-1 text-2xl self-end ml-10' onClick={()=>setLike(!like)}>
            <CiPaperplane />
        </button>
        <span className='text-[grey]'>1k</span>
      </div>
    </div>
  )
}

export default Post
