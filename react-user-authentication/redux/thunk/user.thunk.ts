import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApis } from '../../api/user.api'


export const checkUserCredentialThunk = createAsyncThunk(
    'users/usersCredentialsCheck',
    async ({ email, password }: { email: string, password: string }) => {
        return await userApis.checkUserCredentialsApi(email, password);
    },
);

export const signupNewUserThunk = createAsyncThunk(
    'users/signupNewUser',
    async ({ f_name, l_name, e_mail, password, is_blocked }: { f_name: string, l_name: string, e_mail: string, password: string, is_blocked:number, }) => {
        return await userApis.signupNewUserApi(f_name, l_name, e_mail, password, is_blocked);
    },
);  