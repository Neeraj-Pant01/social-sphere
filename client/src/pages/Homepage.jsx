import React, { useEffect, useState } from 'react'
import AddNewPost from '../components/AddNewPost'
import Post from '../components/Post'
import { getAllPosts } from '../utils/postRequests'
import { useSelector } from 'react-redux'
import Sidecomponent from '../components/Sidecomponent'
import OnlineUser from '../components/OnlineUser'
import { getAllusers } from '../utils/userRequest'
import Homesuggest from '../components/Homesuggest'

const Homepage = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  const user = useSelector((state)=>state.user.currentUser)

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
    getsuggestions()
  },[])

  const getsuggestions = async () =>{
    try{
      const response = await getAllusers(token)
      const filteredList = response.data.filter(elem=>!user.followings.includes(elem._id) && elem._id !== user._id )
      setUsers(filteredList)
  }catch(err){
      console.log(err)
  }
  }

  return (
    <div className='flex md:px-2'>
      <div className="flex-1">
      <Sidecomponent />
      </div>

      <div className="md:flex-[2] px-3 md:px-0 flex flex-col items-center justify-center">
      <AddNewPost />
      <div className='flex flex-col gap-6 min-h[80vh] mt-4'>
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

      <div className="flex-1 sticky top-[55px] h-[90vh] hidden md:flex flex-col gap-4">
        <b className='text-lg text-[grey] mt-4'>Contacts</b>
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
        <b className='text-[grey]'>Suggested for you</b>
        <div className="flex gap-4 flex-col">
        {
          users.length > 0 &&
          users.map((u,i)=>{
            return (
              <Homesuggest key={i} u={u} />
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Homepage
