import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followuser, unfollowuser } from '../utils/userRequest'
import { followUSer, unfollowAUser } from '../redux/userSlice'

const Homesuggest = ({u}) => {
    const token = useSelector((state)=>state.user.currentUser.token)
    const dispatch = useDispatch()

    const handleFollow = async () =>{
        const response = await followuser(token, u._id);
        console.log(response)
        if(response.status === 200){
            dispatch(followUSer({id:u?._id}))
        }
    }
  return (
            <div className="flex gap-1">
            <div className=" flex">
                <img src={u.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fZ_ebLrIR7-37WMGcyj_RO-0TTcZGtUKtg&s"} className='w-[30px] h-[30px] rounded-full' />
            </div>
            <b className='text-[black] flex-1 ml-2'>{u.username}</b>
            <div className="flex-1 flex flex-col gap-2 items-center">
                <button className='py-1 flex items-center justify-center px-3 text-sm text-[#318CE7] rounded-md' onClick={handleFollow}>follow</button>
            </div>
            </div>
  )
}

export default Homesuggest
