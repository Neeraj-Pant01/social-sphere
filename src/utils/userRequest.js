import { makeApirequest } from "./makeApiRequest"

export const getUser = async (token, id) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.get(`/user/${id}`)
        return response
    }catch(err){
        return err
    }
}

export const getfollowList = async (token, id, data) =>{
    const api = makeApirequest(token)
    try{
        const response = data==='fans'? await api.get(`/user/fanslist/${id}`) : await api.get(`/user/followinglist/${id}`)
        return response;
    }catch(err){
        return err
    }
}

export const getAllusers = async (token) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.get(`/user/`)
        return response;
    }catch(err){
        return err
    }
}

export const followuser = async (token, id) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.put(`/user/follow/${id}`)
        return response;
    }catch(err){
        return err
    }
}

export const unfollowuser = async (token, id) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.put(`/user/unfollow/${id}`)
        return response;
    }catch(err){
        return err
    }
}

export const updateUser = async (setLoading, token, id, profilePic) =>{
    const api = makeApirequest(token)
    setLoading(true)
    try{
        const response = await api.put(`/user/${id}`,{
            profilePic
        })
        setLoading(false)
        return response;
    }catch(err){
        setLoading(false)
        return err
    }
}