import { createSlice } from "@reduxjs/toolkit";

const RideInfo = createSlice({

    name: 'ride',
    initialState: [],
    reducers: {
        addRideInfo: (state, action) => {

            return action.payload
        }
    }

})
export const RideAction = RideInfo.actions;
export default RideInfo.reducer;