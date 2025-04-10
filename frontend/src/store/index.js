import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserInfo from "./userProfileSlice";
import RideInfo from "./rideInfoSlice";


const appReducer = combineReducers({
    user: UserInfo,
    ride:RideInfo
})
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined; // Reset all state to initial
    }
    return appReducer(state, action);
};


const uberStore = configureStore({
    reducer: rootReducer,
});

export default uberStore;