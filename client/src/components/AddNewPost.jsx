import React, { useState } from 'react'
import { AiFillCloseSquare, AiOutlineCloudUpload } from 'react-icons/ai'

const AddNewPost = () => {
    const [img, setImg] = useState(null)
    return (
        <div className='flex flex-col mt-3 items-center gap-3 border-2 border-[#324AB2] rounded-lg px-2 py-3 mb-10'>
            <textarea className='border-2 outline-none rounded-md md:w-[300px] w-full h-[100px] px-3 py-3' />
            {
                img ?
                    <div className='relative flex items-center justify-center w-full'>
                        <AiFillCloseSquare className='absolute top-0 right-0 text-3xl rounded-full' onClick={()=>setImg(null)}/>
                        <img src={img && URL.createObjectURL(img)} className='md:w-[300px] h-[200px] w-[80%] rounded-md' />
                    </div>
                    :
                    <div className='flex items-center justify-center gap-2 text-[grey]'>
                        <label htmlFor='imgbtn'>
                            <AiOutlineCloudUpload className='text-3xl font-extrabold text-[grey]' />
                        </label>
                        <input type='file' id='imgbtn' style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])} />
                        add image
                    </div>
            }
            <button className='py-2 px-4 text-[white] bg-[#324AB2] self-end rounded-md'>POST</button>
        </div>
    )
}

export default AddNewPost
