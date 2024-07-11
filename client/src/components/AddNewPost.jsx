import React, { useState } from 'react'
import { AiFillCloseSquare, AiOutlineCloudUpload } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { uploadThePost } from '../utils/postRequests'

const AddNewPost = () => {
    const [img, setImg] = useState(null)
    const [postdes, setPostDesc] = useState('')

    const [base64String, setBase64String] = useState('')

    const user = useSelector((state)=>state.user.currentUser)
    const token = user.token;

    const handleChange = (e) =>{
        setImg(e.target.files[0])

        const file = e.target.files[0];

        if(file){   
        const reader = new FileReader();
        reader.onloadend = () =>{
            setBase64String(reader.result)
        }
        reader.readAsDataURL(file)
        }
    }

    const uploadPost = async () =>{
        let postdata = {
            picture : base64String,
            desc: postdes
        }
        try{
            const response = await uploadThePost(token, postdata)
            if(response.status === 200){
                window.location.reload();
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col mt-3 items-center gap-1  rounded-lg px-2 py-3 mb-10'>
            <textarea className='border-2 outline-none rounded-md md:w-[300px] w-full h-[100px] px-3 py-3' placeholder={`whats on your mind ${user.username} ?`} onChange={(e)=>setPostDesc(e.target.value)}/>
            {
                img ?
                    <div className='relative flex items-center justify-center w-full'>
                        <AiFillCloseSquare className='absolute top-0 right-0 text-3xl rounded-full' onClick={()=>setImg(null)}/>
                        <img src={img && URL.createObjectURL(img)} className='md:w-[300px] h-[200px] w-[80%] rounded-md' />
                    </div>
                    :
                    <div className='flex items-center justify-center gap-2 text-[grey]'>
                        <label htmlFor='imgbtn'>
                            <AiOutlineCloudUpload className='text-3xl font-extrabold text-[gold]' />
                        </label>
                        <input type='file' id='imgbtn' style={{ display: "none" }} onChange={handleChange} />
                        add image
                    </div>
            }
            <button className='py-2 px-4 text-[white] bg-[#324AB2] self-end rounded-md' onClick={uploadPost}>POST</button>
        </div>
    )
}

export default AddNewPost
