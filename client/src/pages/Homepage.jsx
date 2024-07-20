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
  const [loading, setLoading] = useState(false)

  const user = useSelector((state)=>state.user.currentUser)

  const token = useSelector((state)=>state.user?.currentUser?.token)

  useEffect(()=>{
    const getAllThePosts = async () =>{
      setLoading(true)
      try{
        const response = await getAllPosts(token)
        setPosts(response.data)
        setLoading(false)
        if(response.data.clearLocalstorage){
          localStorage.clear();
          setLoading(false)
          window.location.reload();
        }
      }catch(err){
        setLoading(false)
        console.log(err.message)
      }
    }
    getAllThePosts()
    getsuggestions()
  },[])

  const getsuggestions = async () =>{
    try{
      const response = await getAllusers(token)
      const filteredList = response?.data?.filter(elem=>!user.followings.includes(elem._id) && elem._id !== user._id )
      setUsers(filteredList)
  }catch(err){
      console.log(err)
  }
  }

  return (
    <>
    {
      loading ?
      <div className="flex items-center justify-center min-h-[80vh]">
      Loading...
      </div>
      :
    <div className='flex md:px-2 min-h-[80vh]'>
      <div className="md:flex-1 md:block hidden">
      <Sidecomponent />
      </div>

      <div className="md:flex-[2] px-3 md:px-0 flex flex-col items-center w-[100%] md:w-auto">
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

      <div className="flex-1 sticky top-[55px] h-[90vh]  md:flex hidden flex-col gap-4">
        <b className='text-lg text-[teal] mt-4'>Contacts</b>
        <OnlineUser img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&s" name="riya sharma"/>
        <OnlineUser img="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" name="john doe" />
        <OnlineUser img="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" name="kim shrea" />

        <OnlineUser img="https://i.pinimg.com/736x/2b/a2/45/2ba2455ca817f7659e9ebfe9d494c5db.jpg" name="sam alex" />

        <b className='text-[teal]'>Suggested for you</b>
        <div className="flex gap-4 flex-col">
        {
          users?.length > 0 &&
          users?.map((u,i)=>{
            return (
              <Homesuggest key={i} u={u} />
            )
          })
        }
        </div>
      </div>
    </div>
      }
      </>
  )
}

export default Homepage
