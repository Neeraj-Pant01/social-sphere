import React, { useState } from 'react'
import { AiFillStar, AiOutlineComment, AiOutlineStar } from 'react-icons/ai'
import { CiPaperplane } from 'react-icons/ci'
import Comments from '../components/Comments'
import { Link } from 'react-router-dom'

const SinglePost = () => {
    const [like, setLike] = useState(false)
    const [showComments, setShowComments] = useState(true)

  return (
    <div className='flex flex-col px-2 mt-3'>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s' className='h-[240px] rounded-lg'/>
      <div className='flex flex-col px-2'>
        <Link to={'/profile/123'} style={{fontFamily:"cursive"}} className='flex items-center font-bold text-2xl text-[#318CE7]'>
            Neha Adhikari
        </Link>
        <div className='flex items-center justify-center text-[grey]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad, quod iure expedita voluptatum quis. Laboriosam quaerat quidem eaque. Dolorem porro praesentium beatae architecto, repellendus debitis quis eum illum. Laboriosam, fuga incidunt? Et, provident suscipit maiores necessitatibus quidem commodi laborum!
        </div>
        <div className='flex items-center justify-between'>
        {
            like?
            <button className='px-2 py-1 text-3xl text-[gold]' onClick={()=>setLike(!like)}><AiFillStar /></button>
            :
        <button className='px-2 py-1 text-3xl' onClick={()=>setLike(!like)}><AiOutlineStar /></button>
        }
        <span className='text-[#318CE7]'>19K</span>

        <button className='px-2 py-1 text-3xl self-end ml-10' onClick={()=>setShowComments(!showComments)}>
        <AiOutlineComment />
        </button>
        <span className='text-[#318CE7]'>1k</span>

        <button className='px-2 py-1 text-3xl self-end ml-10' >
            <CiPaperplane />
        </button>
        <span className='text-[#318CE7]'>1k</span>
        </div>
        {
          showComments &&
          <div className="flex flex-col mt-3">
            <b>comments</b>
            <div className='flex items-center gap-3'>
              <textarea className='border outline-none px-2 py-2 flex-1' placeholder='add a comment'/>
              <button className='py-2 px-4 bg-[#318CE7] rounded-md text-[white]'>Post</button>
              </div>
            <Comments />
            <Comments />
            <Comments />
            <Comments />
            <Comments />
            <Comments />
            <Comments />
        </div>
        }
      </div>
    </div>
  )
}

export default SinglePost
