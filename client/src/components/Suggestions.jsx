import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followuser, unfollowuser } from '../utils/userRequest'
import { followUSer, unfollowAUser } from '../redux/userSlice'

const Suggestions = ({u}) => {

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
        <div className='flex flex-col gap-1 mb-2 items-center justify-center bg-[#eef2f6] px-2 py-2 rounded-md'>

            <div className="flex gap-1">
            <div className="flex-1 flex-col flex items-center justify-center">
                <img src={u.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fZ_ebLrIR7-37WMGcyj_RO-0TTcZGtUKtg&s"} className='w-[80px] h-[80px] rounded-lg' />
            </div>

            <div className="flex-1 flex flex-col gap-2 items-center">
                <button className='py-1 flex items-center justify-center px-3 text-sm text-[white] rounded-md bg-[#318CE7] bg-[#]' onClick={handleFollow}>follow</button>

                <button className='py-1 flex items-center justify-center rounded-md px-2 text-sm bg-[lightgrey]' >withdraw</button>
            </div>
            </div>
            <b className='text-[black]'>{u.username}</b>
        </div>
    )
}

export default Suggestions
