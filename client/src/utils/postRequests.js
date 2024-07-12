import { makeApirequest } from "./makeApiRequest"

export const uploadThePost = async (token, postData) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.post('/posts/',postData)
        return response
    }catch(err){
        return err
    }
}

//get the single post
export const getTheSinglePost = async (token, id) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.get(`/posts/${id}`)
        return response
    }catch(err){
        return err
    }
}

//get all posts
export const getAllPosts = async (token) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.get(`/posts/`);
        return response
    }catch(err){
        return err
    }
}

//get the user's profile
export const getUsersProfilePosts = async (token, id) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.get(`/posts/user/${id}`)
        return response;
    }catch(err){
        return err
    }
}

//likepost
export const likepost = async (token, id) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.put(`/posts/${id}`)
        return response
    }catch(err){
        return err
    }
}

// dislike a post
export const dislikepost = async (token, id) =>{
    const api = makeApirequest(token)
    try{
        const response = await api.put(`/posts/dislike/${id}`)
        return response
    }catch(err){
        return err
    }
}