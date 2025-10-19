import { userApis } from '../api/user.api'

export const checkUserCredentialsUtil = async ({ email, password }: any) => {
    return await userApis.checkUserCredentialsApi(email, password);
};