import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)

    const handleLogOut = () =>{
        localStorage.clear();
        window.location.reload();
    }

    const user = useSelector((state)=>state.user.currentUser)

    return (
        <div className='bg-[#fffbfb] md:py-3 py-3 px-2 sticky top-0 z-50'>
            <div className='flex items-center justify-between'>
                <div className='md:hidden flex items-center gap-2'>
                    {
                        openMenu ?
                            <AiOutlineClose className='font-extrabold text-[black] text-xl' onClick={() => setOpenMenu(!openMenu)} />
                            :
                            <AiOutlineMenu className='font-extrabold text-[black] text-xl' onClick={() => setOpenMenu(!openMenu)} />
                    }
                    <Link to={'/'}>
                    <b style={{fontFamily:"cursive"}} className='text-[#324AB2]'>SOCIALSPHERE</b>
                    </Link>
                </div>
                <div className='w-[40px] md:w-[40px] h-[40px] md:h-[40px] rounded-full border-2 flex items-start justify-center mr-3'>
                    <img src={user?.profilePic || 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719792000&semt=ais_user'} className='rounded-full w-[40px] h-[40px]' onClick={()=>navigate(`/profile/${user?._id}`)}/>
                </div>
                <div className='md:flex hidden text-xl font-semibold text-[black] underline cursor-pointer'>
                    socialSphere
                </div>
            </div>
            {
                openMenu &&
                <div className='md:hidden bg-[#efeded] min-h-[100px] flex flex-col items-center justify-center gap-2'>
                    <div className='text-[black] font-bold gap-3 text-sm cursor-pointer underline'>Menu Option</div>
                    <div className='text-[black] font-bold text-sm cursor-pointer underline'>Menu Option</div>
                    <div className='text-[black] font-bold text-sm cursor-pointer underline' onClick={handleLogOut}>LogOut</div>
                </div>
            }
        </div>
    )
}

export default Navbar
