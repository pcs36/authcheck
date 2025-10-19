// import { combineReducers } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';

// import slices
import userSliceReducer from './slice/user.slice'


const rootReducer = combineReducers({
    userReducer: userSliceReducer,
});

export default rootReducer;
