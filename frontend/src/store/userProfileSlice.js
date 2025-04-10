import { createSlice } from "@reduxjs/toolkit";

const UserInfo = createSlice({
    name: 'user',
    initialState: {_id:"67daaeb2f3e202e6a7790a9f"},
    reducers: {
        addUserInfo: (state, action) => {

            return action.payload
        }
    }
});

export const UserAction = UserInfo.actions;



export default UserInfo.reducer;