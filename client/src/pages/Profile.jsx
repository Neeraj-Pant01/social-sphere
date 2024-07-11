import React, { useEffect, useState } from 'react'
import { AiFillPicture } from 'react-icons/ai'
import Post from '../components/Post'
import {useNavigate, useParams} from "react-router-dom"
import { useSelector } from 'react-redux'
import { getUser } from '../utils/userRequest'
import { getUsersProfilePosts } from '../utils/postRequests'


const Profile = () => {
  const [profilePosts, setProfilePosts] = useState([])
  const navigate = useNavigate();
  const token = useSelector((state)=>state.user.currentUser.token)
  const user = useSelector((state)=>state.user.currentUser)
  const {id} = useParams();
  const [currentUser, setCurrentUser] = useState();
  const [updatedImage, setUpdatedImg] = useState(null)

  const getTheUser = async (token, id) =>{
    try{
      const response = await getUser(token, id);
      setCurrentUser(response.data)
    }catch(err){
      console.log(err)
    }
  }

  const getAllTheProfilePost = async (token,id) =>{
    try{
      const response = await getUsersProfilePosts(token,id)
      setProfilePosts(response.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getTheUser(token, id)
    getAllTheProfilePost(token,id)
  },[id])


  return (
    <div className='min-h-screen'>
      <div className='flex items-center justify-center relative h-[240px] border'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI327d9xKBPs8w7rJL5j40RNoOu2jG2WR0Pg&s' className='h-full' />
        <div className='flex absolute w-[140px] h-[140px] rounded-full border-4 border-[lightgrey] bottom-[-20%]'>
          <label htmlFor='u-img'>
            {
              updatedImage ?
              <img src={URL.createObjectURL(updatedImage)} className='rounded-full w-[140px] h-[140px]'/>
              :
              <img src={currentUser?.profilePic || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719792000&semt=ais_user"} className='rounded-full w-[140px] h-[140px]'/>
            }
          </label>
          {
            user?._id === id &&
            <input type='file' id='u-img' style={{display:"none"}} onChange={(e)=>setUpdatedImg(e.target.files[0]) } />
          }
        </div>
      </div>

      <div className='flex flex-col items-center pt-[50px]'>
        <b className='text-xl'>{currentUser?.username}</b>

        <div className='flex items-center justify-center gap-5 mt-5'>
            <button className='bg-[lightgrey] py-2 px-4 rounded-lg font-semibold' onClick={()=>navigate(`/fans/${user._id}`,{state:"fans"})}>Fans {currentUser?.followers.length}</button>
            <button className='bg-[lightgrey] py-2 px-4 rounded-lg font-semibold' onClick={()=>navigate(`/fans/${user._id}`,{state:"followings"})}>Followings {currentUser?.followings.length}</button>
        </div>

        <div className='flex flex-col w-full items-center mt-4'>
            <div className='flex items-center w-[80%] justify-center gap-5'>
                <span className='font-semibold text-end w-[50%]'>FROM :</span>
                <span className='text-[grey] w-[50%]'>{currentUser?.area}</span>
            </div>
            <div className='flex items-center w-[80%] justify-center gap-5'>
                <span className='font-semibold text-end w-[50%]'>LIVES IN :</span>
                <span className='text-[grey] w-[50%]'>{currentUser?.city}</span>
            </div>
            <div className='flex items-center w-[80%] justify-center gap-5'>
                <span className='font-semibold w-[50%] text-end'>COUNTRY :</span>
                <span className='text-[grey] w-[50%]'>{currentUser?.country}</span>
            </div>
        </div>
        <div className='flex'>
            <div className='flex items-center bg-[#324AB2] gap-2 py-2 px-4 mt-4 rounded-lg'>
                <span className='text-[white]'>POSTS</span>
                <AiFillPicture className='text-[white] font-5xl' />
                <span className='text-[white]'>{profilePosts.length}</span>
            </div>
        </div>
      </div>
      <div className='flex flex-col mt-4 px-3 gap-4'>
        <b className='px-3'>POSTS({profilePosts.length})</b>
        {
          profilePosts.map((p,i)=><Post key={i} p={p} />)
        }
      </div>
    </div>
  )
}

export default Profile
