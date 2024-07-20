import React, { useEffect, useState } from 'react'
import { AiFillPicture } from 'react-icons/ai'
import Post from '../components/Post'
import {useNavigate, useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../utils/userRequest'
import { getUsersProfilePosts } from '../utils/postRequests'
import { app } from '../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { loginUser, updateUserInfo } from '../redux/userSlice'


const Profile = () => {
  const [profilePosts, setProfilePosts] = useState([])
  const navigate = useNavigate();
  const token = useSelector((state)=>state.user.currentUser.token)
  const user = useSelector((state)=>state.user.currentUser)
  const {id} = useParams();
  const [currentUser, setCurrentUser] = useState();
  const [updatedImage, setUpdatedImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{
    window.scrollTo(0,0)
},[])

  const getTheUser = async (token, id) =>{
    setLoading(true)
    try{
      const response = await getUser(token, id);
      setCurrentUser(response.data)
      setLoading(false)
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  const uploadPostImage = async () => {
    if (updatedImage) {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + updatedImage.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, updatedImage);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                  setLoading(false)
                    console.log(error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    }).catch((error) => {
                        reject(error);
                        setLoading(false)
                    });
                }
            );
        });
    } else {
      setLoading(false)
        return null;
    }
};

  const handleUpdateProfile = async () =>{
    setLoading(true)
    const url = await uploadPostImage();
    if(url){
      const response = await updateUser(setLoading, token, user._id, url)
      if(response.status === 200){
        dispatch(updateUserInfo(response.data))
        setLoading(false)
      }
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
    <>
    {
      loading ?
      <div className='flex items-center justify-center'>
        Loading...
      </div>
      :
    <div className='min-h-screen'>
      <div className='flex items-center justify-center relative h-[240px]'>
        <img src='https://static.vecteezy.com/system/resources/previews/003/228/004/non_2x/road-out-of-the-forest-beautiful-autumn-landscape-vector.jpg' className='h-full md:w-[70%] object-cover md:h-[400px]' />
        <div className='flex absolute w-[140px] h-[140px] rounded-full border-4 border-[lightgrey] bottom-[-20%] md:bottom-[-35%]'>
          <label htmlFor='u-img' className='cursor-pointer'>
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
        <b className='text-xl md:mt-10'>{currentUser?.username}</b>

        {
          loading ?
          <div className='py-2 px-4 text-[white] bg-[teal] mt-3 rounded-md'> Loading...</div>
          :
          updatedImage && <button className='py-2 px-4 text-[white] bg-[teal] mt-3 rounded-md' onClick={handleUpdateProfile}>update profile image</button>
        }

        <div className='flex items-center justify-center gap-5 mt-5'>
            <button className='bg-[lightgrey] py-2 px-4 rounded-lg font-semibold' onClick={()=>navigate(`/fans/${user._id}`,{state:"fans"})}>Fans {currentUser?.followers?.length}</button>
            <button className='bg-[lightgrey] py-2 px-4 rounded-lg font-semibold' onClick={()=>navigate(`/fans/${user._id}`,{state:"followings"})}>Followings {currentUser?.followings?.length}</button>
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
                <span className='text-[white]'>{profilePosts?.length}</span>
            </div>
        </div>
      </div>
      <div className=' md:hidden flex flex-col mt-4 px-3 gap-4'>
        <b className='px-3'>POSTS({profilePosts?.length})</b>
        {
          profilePosts?.length > 0 &&
          profilePosts?.map((p,i)=><Post key={i} p={p} />)
        }
      </div>

      <div className="hidden md:flex items-center justify-center mt-6">
        {/* <div className="border w-[400px]">left</div> */}
        <div className="flex flex-col w-[600px] gap-10">
        <b className='px-3 text-center'>POSTS({profilePosts?.length})</b>
        {
          profilePosts?.length > 0 &&
          profilePosts?.map((p,i)=><Post key={i} p={p} />)
        }
        </div>
      </div>
    </div>
        }
    </>
  )
}

export default Profile
