import { makeApirequest } from "./makeApiRequest"

export const getPostComments = async (token, postId)  =>{
    const api = makeApirequest(token, postId);
    try{
        const response = await api.get(`/comments/${postId}`)
        return response;
    }catch(err){
        return err;
    }
}

export const addPostComment = async (token, postId, commentData) =>{
    const api = makeApirequest(token, postId);
    try{
        const response = await api.post(`/comments/${postId}`,commentData)
        return response;
    }catch(err){
        return err;
    }
}

export const reportTheComment = async (token, postId) =>{
    const api = makeApirequest(token, postId);
    try{
        const response = await api.put(`/${postId}`)
        return response;
    }catch(err){
        return err;
    }
}

export const deleteComment = async (token, postId) =>{
    const api = makeApirequest(token, postId);
    try{
        const response = await api.delete(`/${postId}`)
        return response;
    }catch(err){
        return err;
    }
}