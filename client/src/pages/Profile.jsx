import React from 'react'
import { AiFillPicture } from 'react-icons/ai'
import Post from '../components/Post'
import {useNavigate} from "react-router-dom"


const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='flex items-center justify-center relative h-[240px] border'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI327d9xKBPs8w7rJL5j40RNoOu2jG2WR0Pg&s' className='h-full' />
        <div className='flex absolute w-[140px] h-[140px] rounded-full border-4 border-[lightgrey] bottom-[-20%]'>
            <img src='https://img.mensxp.com/media/content/2020/Feb/Puja-Tomar-Is-A-Fierce-Fighter-Who-Fears-Nothing1200_5e3802ac1481d.jpeg' className='rounded-full'/>
        </div>
      </div>

      <div className='flex flex-col items-center pt-[50px]'>
        <b className='text-xl'>Neha Adhikari</b>

        <div className='flex items-center justify-center gap-5 mt-5'>
            <button className='bg-[lightgrey] py-2 px-4 rounded-lg font-semibold' onClick={()=>navigate('/fans',{state:"fans"})}>Fans 1.5k</button>
            <button className='bg-[lightgrey] py-2 px-4 rounded-lg font-semibold' onClick={()=>navigate('/fans',{state:"followings"})}>Followings 1</button>
        </div>

        <div className='flex flex-col w-full items-center mt-4'>
            <div className='flex items-center w-[80%] justify-center gap-5'>
                <span className='font-semibold text-end w-[50%]'>FROM :</span>
                <span className='text-[grey] w-[50%]'>DWARAHAAT</span>
            </div>
            <div className='flex items-center w-[80%] justify-center gap-5'>
                <span className='font-semibold text-end w-[50%]'>LIVES IN :</span>
                <span className='text-[grey] w-[50%]'>CHAMOLI</span>
            </div>
            <div className='flex items-center w-[80%] justify-center gap-5'>
                <span className='font-semibold w-[50%] text-end'>COUNTRY :</span>
                <span className='text-[grey] w-[50%]'>INDIA</span>
            </div>
        </div>
        <div className='flex'>
            <div className='flex items-center bg-[#324AB2] gap-2 py-2 px-4 mt-4 rounded-lg'>
                <span className='text-[white]'>POSTS</span>
                <AiFillPicture className='text-[white] font-5xl' />
                <span className='text-[white]'>200</span>
            </div>
        </div>
      </div>
      <div className='flex flex-col mt-4 px-3 gap-4'>
        <b className='px-3'>POSTS(200)</b>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Profile
