import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineComment, AiOutlineDelete, AiOutlineStar } from 'react-icons/ai'
import { CiPaperplane } from 'react-icons/ci'
import Comments from '../components/Comments'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { dislikepost, getTheSinglePost, likepost } from '../utils/postRequests'
import { getUser } from '../utils/userRequest'
import { addPostComment, getPostComments } from '../utils/commentRequest'

const SinglePost = () => {
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(true)
  const [post, setPost] = useState()
  const [comment, setComment] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [likes, setLikes] = useState(0)
  const [like, setLike] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams();

  const token = useSelector((state) => state.user.currentUser.token)
  const user = useSelector((state) => state.user.currentUser)

  useEffect(()=>{
    window.scrollTo(0,0)
})

  const getSinglePost = async (token, id) => {
    setLoading(true)
    try {
      const response = await getTheSinglePost(token, id)
      setPost(response.data)
      setLikes(response.data.likes.length)
      setLike(response.data.likes.includes(user._id))
      getThePostOwner(response.data.userId)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const getThePostOwner = async (userId) => {
    try {
      const response = await getUser(token, userId)
      setCurrentUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getTheComments = async () =>{
    try{
      const response = await getPostComments(token, id)
      setComments(response.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getSinglePost(token, id)
    getTheComments()
  }, [id])

  const handleComment = async () => {
    const commentData = {
      comment: comment
    }
    const response = await addPostComment(token, post?._id, commentData)
    setComment("")
    getTheComments()
  }

    const handleLike = async () =>{
      const response = await likepost(token, post?._id)
      if(response.status === 200){
      setLike(true)
      setLikes(likes + 1)
      }
  }


    const handleDislike = async () =>{
      const response = await dislikepost(token, post?._id)
      if(response.status === 200){
        setLikes(likes - 1)
        setLike(!like)
      }
    }

  return (
    <>
    {loading ?
    <div className='flex items-center justify-center'>
      Loading...
    </div>
    :
    <div className='flex flex-col md:flex-row md:justify-center px-2 md:gap-4 mt-3 min-h-screen'>
      {post?.picture && <img src={post?.picture} className='h-[240px] md:sticky md:top-[50px] md:w-[50%] md:h-[450px] rounded-lg md:my-10' />}
      <div className='flex flex-col md:w-[300px] px-2 md:my-10'>
        <Link to={`/profile/${post?.userId}`} style={{ fontFamily: "cursive" }} className='flex items-center font-bold text-2xl text-[#318CE7]'>
          {
            currentUser?.username
          }
        </Link>
        <div className='flex text-[grey]'>
          {
            post?.desc
          }
        </div>
        <div className='flex items-center justify-between'>

          <div className="flex items-center">
            {
              like ?
                <button className='px-2 py-1 text-2xl text-[gold]' onClick={handleDislike}><AiFillStar /></button>
                :
                <button className='px-2 py-1 text-2xl'  onClick={handleLike}><AiOutlineStar /></button>
            }
            <span className='text-[#318CE7]'>{likes}</span>

          </div>
          <div className="flex items-center">
            <button className='px-2 py-1 text-2xl self-end ml-10'>
              <AiOutlineComment />
            </button>
            <span className='text-[#318CE7]'>{comments.length}</span>
          </div>

          <div className="flex items-center">
            <button className='px-2 py-1 text-2xl self-end ml-10' >
              <CiPaperplane />
            </button>
            <span className='text-[grey]'>0</span>
          </div>

          {
            user._id === post?.userId &&
            <div className='flex'>
              <button className='px-2 py-1 text-2xl self-end ml-10'>
                <AiOutlineDelete className='text-[tomato] font-bold cursor-pointer' />
              </button>
            </div>
          }
        </div>

        {
          showComments &&
          <div className="flex flex-col mt-3">
            <b>comments</b>
            <div className='flex items-center gap-3 mb-2'>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='border outline-none px-2 py-2 flex-1' placeholder='add a comment' />
              <button className='py-2 px-4 bg-[#318CE7] rounded-md text-[white]' onClick={handleComment}>Post</button>
            </div>
            {
              comments.map((c,i)=><Comments key={i} getTheComments={getTheComments} c={c} />)
            }
          </div>
        }
      </div>
    </div>
}
    </>
  )
}

export default SinglePost
