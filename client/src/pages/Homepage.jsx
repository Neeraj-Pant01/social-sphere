import React, { useEffect, useState } from 'react'
import AddNewPost from '../components/AddNewPost'
import Post from '../components/Post'
import { getAllPosts } from '../utils/postRequests'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const [posts, setPosts] = useState([])

  const token = useSelector((state)=>state.user?.currentUser?.token)

  useEffect(()=>{
    const getAllThePosts = async () =>{
      try{
        const response = await getAllPosts(token)
        setPosts(response.data)
      }catch(err){
        console.log(err)
      }
    }
    getAllThePosts()
  },[])

  return (
    <div className='px-2'>
      <AddNewPost />

      {/* posts */}
      <div className='flex flex-col gap-6 mt-4'>
        {
          posts?.length > 0 &&
          posts?.map((p,i)=>{
            return (
              <Post key={i} p={p} />
            )
          })
        }
      </div>

    </div>
  )
}

export default Homepage
