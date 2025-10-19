import axiosInstance from './api.service';
import axios, { AxiosInstance } from 'axios';

/**
 * Performs an asynchronous POST API call using Axios.
 *
 * @template T - The type of the request body.
 * @param {string} endPoint - The API endpoint to call.
 * @param {T | any} body - The data to be sent in the request body.
 * @returns {Promise<any | CustomError>} A promise that resolves with the fetched data or rejects with a CustomError.
 */
export async function postApiCall<T>(
  endPoint: string,
  body?: T,
): Promise<any> {
  try {
    const fetchedData = await axiosInstance.post(endPoint, body);
    // console.log("fetchedData-------------", fetchedData)
    if (fetchedData.data?.status === 200 || fetchedData.data?.status === 201) {
      return fetchedData?.data;
    }

  } catch (error: any) {
    // console.log("postApiCall<T>---------------", error);
    if (error.response) {
      return error.response?.data
    }
    
  }
}

