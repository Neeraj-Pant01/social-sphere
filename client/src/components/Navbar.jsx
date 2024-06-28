import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className='bg-[#efeded] md:py-3 py-3 px-2 sticky top-0'>
            <div className='flex items-center justify-between'>
                <div className='md:hidden'>
                    {
                        openMenu ?
                            <AiOutlineClose className='font-extrabold text-[black] text-xl' onClick={() => setOpenMenu(!openMenu)} />
                            :
                            <AiOutlineMenu className='font-extrabold text-[black] text-xl' onClick={() => setOpenMenu(!openMenu)} />
                    }
                </div>
                <div className='w-[30px] md:w-[40px] h-[30px] md:h-[40px] rounded-full border-2 flex items-start justify-center'>sda</div>
                <div className='md:flex hidden text-xl font-semibold text-[black] underline cursor-pointer'>
                    socialSphere
                </div>
            </div>
            {
                openMenu &&
                <div className='md:hidden bg-[#efeded] min-h-[100px] flex flex-col items-center justify-center'>
                    <div className='text-[black] font-bold gap-3 text-lg cursor-pointer'>Menu Option</div>
                    <div className='text-[black] font-bold text-lg cursor-pointer'>Menu Option</div>
                    <div className='text-[black] font-bold text-lg cursor-pointer'>LogOut</div>
                </div>
            }
        </div>
    )
}

export default Navbar
