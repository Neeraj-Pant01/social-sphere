import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Suggestions from '../components/Suggestions';
import { useDispatch, useSelector } from 'react-redux';
import { getAllusers, getfollowList, unfollowuser } from '../utils/userRequest';
import { unfollowAUser } from '../redux/userSlice';

const Fan = ({l}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const token = useSelector((state)=>state.user.currentUser.token)

    const handleUnfollow = async () =>{
        const response = await unfollowuser(token , l._id);
        console.log(response)
        if(response.status === 200){
            dispatch(unfollowAUser({id:l._id}))
        }
    }

    useEffect(()=>{
        window.scrollTo(0,0)
    })


    return (
        <div className='flex items-center gap-4 justify-center mb-3'>
            <div className="flex items-end justify-end flex-1">
            <span className='bg-[lightgrey] py-2 px-4 rounded-md' onClick={()=>navigate('/profile/123')}>{l?.username}</span>
            </div>
            <div className="flex flex-1">
            <button className='py-2 px-5 rounded-lg bg-[#324AB2] text-[white]' onClick={handleUnfollow}>Remove</button>
            </div>
        </div>
    )
}
const Followings = ({l}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = useSelector((state)=>state.user.currentUser.token)

    const handleUnfollow = async () =>{
        const response = await unfollowuser(token, l._id);
        console.log(response)
        if(response.status === 200){
            dispatch(unfollowAUser({id:l._id}))
        }
    }


    return (
        <div className='flex py-2 items-center gap-4 justify-center mb-3'>
            <div className="flex items-end justify-end flex-1">
            <span className='bg-[lightgrey] py-2 px-4 rounded-md' onClick={()=>navigate('/profile/123')}>{l?.username}</span>
            </div>
            <div className="flex flex-1">
            <button className='py-2 px-5 rounded-lg bg-[#324AB2] text-[white]' onClick={handleUnfollow}>unfollow</button>
            </div>
        </div>
    )
}

const Fans = () => {
    const location = useLocation();
    const data = location.state;
    const [list, setList] = useState([])
    const {id} = useParams();
    const [showSuggest, setShowSuggest] = useState(false)
    const [users, setUsers] = useState([])

    const token = useSelector((state)=>state.user.currentUser.token)
    const user = useSelector((state)=>state.user.currentUser)

    useEffect(()=>{
        const getfollowListOfUsers = async () =>{
            const response = await getfollowList(token, id, data)
            setList(response.data)
        }
        getfollowListOfUsers()
    },[id])

    const handleSuggestions = async () =>{
        setShowSuggest(!showSuggest)
        if(!showSuggest){
            try{
                const response = await getAllusers(token)
                const filteredList = response.data.filter(elem=>!user.followings.includes(elem._id) && elem._id !== user._id )
                setUsers(filteredList)
            }catch(err){
                
            }
        }
    }

    return (
        <div className='flex flex-col'>
            {
                data === "fans" ?
                    <div>
                        <div className='text-center mb-5 mt-3 text-[grey] font-bold text-lg'>Fans({list.length})</div>
                        {
                            list.length > 0 ?
                            list.map((l,i)=><Fan fans="fans" key={i} l={l} />)
                            :
                            <div className='text-center text-[grey]'> no fans to show </div>
                        }
                    </div>
                    :
                    <div>
                        <div className='text-center mb-5 mt-3 text-[grey] font-bold text-lg'>followings</div>
                        {
                            list.length > 0 ?
                            list.map((l,i)=><Followings followings={"followings"} key={i} l={l} />)
                            :
                            <div className='text-center text-[grey]'> your followings list is empty </div>
                        }
                    </div>
            }
            <div className='flex items-center justify-center flex-col mt-5'>
                <button className='py-2 rounded-lg px-4 bg-[#318CE7] text-[white] mb-8' onClick={handleSuggestions}>{showSuggest ? "HIDE " : "SHOW "}     SUGGESTIONS</button>
                {
                    showSuggest &&

                    <div className='flex flex-wrap items-center justify-center gap-4'>
                        {
                            users.map((u,i)=><Suggestions key={i} u={u} />)
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Fans
