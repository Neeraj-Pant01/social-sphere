import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { loginUser } from '../redux/userSlice'

const Login = () => {
    const [login, setLogin] = useState(true)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
        username:"",
        email:"",
        password:"",
        mobile:"",
        city:"",
        area:"",
        country:""
    })

    const handleUser = async () =>{
        try{
            const response = login ? await axios.post(`${import.meta.env.VITE_REACT_APP_URI}/auth/signin`,userInfo) : await axios.post(`${import.meta.env.VITE_REACT_APP_URI}/auth/signup`,userInfo)
            console.log(response)
            if(!login && response.status === 200){
                setLogin(true)
            }else if(login && response.status === 200){
                dispatch(loginUser(response.data));
                navigate('/')
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleCHange = (e) =>{
        const {name, value} = e.target;
        setUserInfo((pre)=>{
            return {...pre, [name]:value}
        })
    }

    return (
        <div className='min-h-screen flex flex-col items-center py-6 bg-[#F0F8FF]'>

            <div className='flex items-center justify-center'>
                <b className='flex text-3xl text-[#318CE7]'>
                    socialSphere
                </b>
            </div>

            <div className='flex items-center mb-8 justify-center mt-9'>
                <b className='text-xl text-[#324AB2]'>{login ?
                    "Login" : "Register"
                }
                </b>
            </div>

            <div className='flex flex-col bg-[white] rounded-lg w-[90%] px-3 py-4 gap-2'>

                <input type='email' placeholder='enter email' className='border px-4 py-2 rounded-md outline-none' name='email' onChange={handleCHange} />

                <input type='password' placeholder='enter password' className='border px-4 py-2 rounded-md outline-none' name='password' onChange={handleCHange} />


                {!login && <input type='text' placeholder='enter username' className='border px-4 py-2 rounded-md outline-none' name='username' onChange={handleCHange} />}

                {!login && <input type='text' placeholder='enter mobile' className='border px-4 py-2 rounded-md outline-none' name='mobile' onChange={handleCHange} />}

                {!login && <input type='text' placeholder='enter city' className='border px-4 py-2 rounded-md outline-none' name='city' onChange={handleCHange} />}

                {!login && <input type='text' placeholder='enter area' className='border px-4 py-2 rounded-md outline-none' name='area' onChange={handleCHange} />}

                {!login && <input type='text' placeholder='enter country' className='border px-4 py-2 rounded-md outline-none' name='country' onChange={handleCHange} />}

                {
                    <button className='px-4 py-2 text-[white] rounded-md bg-[#324AB2]' onClick={handleUser}>{login ? "Login" : "Register"}</button>
                }
            </div>

            <div className='flex items-center justify-center mt-2'>
                {
                    login ?
                        <b onClick={() => setLogin(false)}>don't have an account register ?</b>
                        :
                        <b onClick={() => setLogin(true)}>alreday have an account Login</b>
                }
            </div>

        </div>
    )
}

export default Login
