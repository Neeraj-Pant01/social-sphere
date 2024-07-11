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
        }
    }
})

export const { loginUser, followUSer, unfollowAUser } = userSlice.actions;
export default userSlice.reducer;