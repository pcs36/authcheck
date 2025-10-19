import { postApiCall } from '../service/crud.service';
import { endPoints } from '../constants/endPoint.const';

/**
 * check user Credentials   
 */
async function checkUserCredentialsApi(
  e_mail: string,
  password: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.userLogin, {
      e_mail,
      password,
    });
    return result;
  } catch (error: any) {
    throw error;
  }
}

/**
 * check user Credentials    f_name, l_name, e_mail, password, is_blocked
 */
async function signupNewUserApi(
  f_name: string,
  l_name: string,
  e_mail: string,
  password: string,
  is_blocked:number
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.createUser, {
      f_name,
      l_name,
      e_mail,
      password,
      is_blocked,
    });
    return result;
  } catch (error: any) {
    console.log("E1111111------", error)
    throw error;
  }
}



export const userApis = {
  checkUserCredentialsApi,
  signupNewUserApi
};

