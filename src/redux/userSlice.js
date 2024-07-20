import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.currentUser = action.payload;
        },

        followUSer: (state, action) => {
            if (state.currentUser && state.currentUser.followings) {
                state.currentUser.followings.push(action.payload.id);
            }
        },

        unfollowAUser: (state, action) =>{
            if(state.currentUser && state.currentUser.followings){
                state.currentUser.followings = state.currentUser.followings.filter(id => id !== action.payload.id)
            }
        },

        updateUserInfo:(state, action) =>{
            const token = state.currentUser?.token
            state.currentUser = {...action.payload , token} 
        }
    }
})

export const { loginUser, followUSer, unfollowAUser, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;