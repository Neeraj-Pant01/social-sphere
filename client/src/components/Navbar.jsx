import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className='bg-[lightblue] md:py-3 py-3 px-2'>
            <div className='md:hidden'>
                {
                    openMenu ?
                    <AiOutlineClose className='font-extrabold' onClick={()=>setOpenMenu(!openMenu)} />
                    :
                    <AiOutlineMenu className='font-extrabold' onClick={()=>setOpenMenu(!openMenu)}/>
                }
            </div>
            {
            openMenu &&
                <div className='md:hidden bg-[black] h-[100px]'>
                    this is the scrollable menu
                </div>
            }
        </div>
    )
}

export default Navbar
