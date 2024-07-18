import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineComment, AiOutlineStar } from 'react-icons/ai'
import { CiPaperplane } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/userRequest';
import { useSelector } from 'react-redux';
import { getPostComments } from '../utils/commentRequest';
import { dislikepost, likepost } from '../utils/postRequests';

const Post = ({p}) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState()
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState(p.likes.length)

    const token = useSelector((state)=>state.user.currentUser.token)
    const id = p?.userId
    const user = useSelector((state)=>state.user.currentUser)

    const [like, setLike] = useState(p.likes.includes(user._id))

    const getTheUser = async (token, id) =>{
      try{
        const response = await getUser(token, id);
        setCurrentUser(response.data)
      }catch(err){
        console.log(err)
      }
    }
    const getTheComments = async () =>{
      try{
        const response = await getPostComments(token, p?._id)
        setComments(response.data)
      }catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      getTheUser(token, id)
      getTheComments()
    },[])

    const handleLike = async () =>{
      const response = await likepost(token, p?._id)
      if(response.status === 200){
      setLike(true)
      setLikes(likes + 1)
      }
    }

    const handleDislike = async () =>{
      const response = await dislikepost(token, p?._id)
      if(response.status === 200){
        setLikes(likes - 1)
        setLike(!like)
      }
    }

    // const desc = p?.desc;
    // console.log(desc.length)

  return (
    <div className='flex flex-col px-2 md:px-4 rounded-md md:rounded-lg bg-[#f7f6f6] py-4'>
      <div className='flex flex-col'>
        {
          p?.picture &&
          <div className="flex-1 flex items-center justify-center" onClick={()=>navigate(`/post/${p?._id}`)}>
          <img src={p?.picture} alt='post' className='rounded-md md:h-[300px] h-[200px] w-[90%]' />
        </div>
        }
      <div className="flex-1 flex flex-col">
        <Link to={`/profile/${currentUser?._id}`} style={{fontFamily:"cursive"}}  className=' font-bold text-xl text-[#318CE7]'>
        {
          currentUser?.username
        }
        </Link>
        <div className='flex flex-col text-[grey]'>
          {
            p?.desc !== undefined ?
            p?.desc.substring(0,60) : p?.desc
          }
          <button className='mt-1 w-max text-[black]' onClick={()=>navigate(`/post/${p?._id}`)}>Read more...</button>
        </div>
      </div>
      </div>
      <div className='flex items-center justify-between mt-1 px-2'>
        <div className="flex items-center">
        {
            like?
            <button className='px-2 py-1 text-2xl text-[gold]'><AiFillStar onClick={handleDislike}/></button>
            :
        <button className='px-2 py-1 text-2xl' ><AiOutlineStar onClick={handleLike} /></button>
        }
        <span className='text-[#318CE7]'>{likes}</span>

        </div>
        <div className="flex items-center">
        <button className='px-2 py-1 text-2xl self-end ml-10' onClick={()=>navigate(`/post/${p?._id}`)}>
        <AiOutlineComment />
        </button>
        <span className='text-[#318CE7]'>{comments.length}</span>
        </div>

        <div className="flex items-center">
        <button className='px-2 py-1 text-2xl self-end ml-10' onClick={()=>setLike(!like)}>
            <CiPaperplane />
        </button>
        <span className='text-[grey]'>0</span>
        </div>
      </div>
    </div>
  )
}

export default Post
