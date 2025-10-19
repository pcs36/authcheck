import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  checkUserCredentialThunk,
} from '../thunk/user.thunk';


export interface UserDetailsState {
  userProfileDetailsUpdating: boolean;
  userProfileImageUpdating: boolean;
  userAuthStatus: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE';
  userDetailsUpdating: 'PENDING' | 'SUCCESS' | 'ERROR' | 'IDEL';
  userTokenLoadingFromLS: 'PENDING' | 'SUCCESS' | 'ERROR' | 'IDEL';
  userLoginLoading: 'PENDING' | 'SUCCESS' | 'ERROR' | 'IDEL';
  userDetails: any;
  userDetailsError: any;
  token: string;
  userTokenError: any;
  userLoginError: any;
  forgotPasswordLoading: 'PENDING' | 'SUCCESS' | 'ERROR' | 'IDEL';
  forgotPasswordError: string;
  forgotPasswordSuccess: boolean;
  otp: string | null;
  userId: number | null;
}

const initialState: UserDetailsState = {
  userProfileDetailsUpdating: false,
  userProfileImageUpdating: false,
  userAuthStatus: 'PENDING',
  userDetailsUpdating: 'IDEL',
  userTokenLoadingFromLS: 'IDEL',
  userLoginLoading: 'IDEL',
  userDetails: {},
  userDetailsError: '',
  token: '',
  userTokenError: '',
  userLoginError: '',
  forgotPasswordLoading: 'IDEL',
  forgotPasswordError: '',
  forgotPasswordSuccess: false,
  otp: null,
  userId: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    setUserAuthStatus: (
      state,

      action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>,

    ) => {
      state.userAuthStatus = action.payload;
    },
    resetUserSlice: (): any => ({
      ...initialState,
      userAuthStatus: 'UN_AUTHORIZED',
    }),
  },

  extraReducers: (builder) => {
    console.log('checkUserCredentialThunk----------------------', );
    // checks the email and password is valid or not
    builder.addCase(checkUserCredentialThunk.pending, state => {
      console.log('Pending-----------------');
      state.userLoginLoading = 'PENDING';
      state.userLoginError = '';
    });
    builder.addCase(
      checkUserCredentialThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.userDetails = action.payload?.data;
        state.token = action.payload?.data?.token;
        
        state.userAuthStatus = 'AUTHORIZED';
        state.userLoginLoading = 'SUCCESS';
      },
    );
    builder.addCase(checkUserCredentialThunk.rejected, (state, action) => {
      state.userLoginLoading = 'ERROR';
      state.userLoginError = action.error.message;
      state.userAuthStatus = 'UN_AUTHORIZED';
      // errorMessage('Error', action.error.message);
    });

    
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails, setUserAuthStatus, resetUserSlice } =
  userSlice.actions;

export default userSlice.reducer;
