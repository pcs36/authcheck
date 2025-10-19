import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {storeLocalData, getLocalData} from '../../utils/util.utils';

import {
  checkUserCredentialThunk
} from '../thunk/user.thunk';


export interface UserDetailsState {
  userId: number | null;
  userDetails: any;
  loginUserDetailsLoader?: boolean;
  token: string;
}

const initialState: UserDetailsState = {
  userId: null,
  userDetails: {},
  loginUserDetailsLoader: false,
  token: "",
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userId = action.payload;
    },
  },

  extraReducers: builder => {

    builder.addCase(checkUserCredentialThunk.pending, state => {
      state.loginUserDetailsLoader = true;
    });
    builder.addCase(checkUserCredentialThunk.fulfilled, (state, action) => {
      state.loginUserDetailsLoader = false;
      state.token = action.payload?.data?.token;
      state.userId = action.payload?.data?.id;
      state.userDetails = action.payload?.data;
      storeLocalData({storagename: 'user_token', data: action.payload?.data?.token});
      storeLocalData({storagename: 'user_details', data: action.payload?.data});
    });
    builder.addCase(checkUserCredentialThunk.rejected, (state) => {
      state.loginUserDetailsLoader = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;