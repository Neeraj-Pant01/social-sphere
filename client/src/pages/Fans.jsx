import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Suggestions from '../components/Suggestions';

const Fan = () => {
    const navigate = useNavigate();

    return (
        <div className='flex items-center gap-4 justify-center mb-3'>
            <span className='bg-[lightgrey] py-2 px-4 rounded-md' onClick={()=>navigate('/profile/123')}>username</span>
            <button className='py-2 px-5 rounded-lg bg-[#324AB2] text-[white]'>Remove</button>
        </div>
    )
}
const Followings = () => {
    const navigate = useNavigate();

    return (
        <div className='flex items-center gap-4 justify-center mb-3'>
            <span className='bg-[lightgrey] py-2 px-4 rounded-md' onClick={()=>navigate('/profile/123')}>username</span>
            <button className='py-2 px-5 rounded-lg bg-[#324AB2] text-[white]'>unfollow</button>
        </div>
    )
}

const Fans = () => {
    const location = useLocation();
    const data = location.state;
    const [showSuggest, setShowSuggest] = useState(false)

    return (
        <div className='flex flex-col'>
            {
                data === "fans" ?
                    <div>
                        <div className='text-center mb-5 mt-3 text-[grey] font-bold text-lg'>Fans(1k)</div>
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                        <Fan fans="fans" />
                    </div>
                    :
                    <div>
                        <div className='text-center mb-5 mt-3 text-[grey] font-bold text-lg'>followings</div>
                        <Followings followings={"followings"} />
                        <Followings followings={"followings"} />
                        <Followings followings={"followings"} />
                        <Followings followings={"followings"} />
                        <Followings followings={"followings"} />
                        <Followings followings={"followings"} />
                        <Followings followings={"followings"} />
                        <Followings followings={"followings"} />
                        <Followings followings={"followings"} />
                    </div>
            }
            <div className='flex items-center justify-center flex-col mt-5'>
                <button className='py-2 rounded-lg px-4 bg-[#318CE7] text-[white] mb-8' onClick={() => setShowSuggest(!showSuggest)}>{showSuggest ? "HIDE " : "SHOW "}     SUGGESTIONS</button>
                {
                    showSuggest &&

                    <div className='flex flex-wrap items-center justify-center gap-4'>
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                        <Suggestions />
                    </div>
                }
            </div>
        </div>
    )
}

export default Fans
