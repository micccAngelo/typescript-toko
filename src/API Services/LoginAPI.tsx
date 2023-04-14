import { AxiosError } from 'axios';
import BaseURLLogin from './Base URL/BaseURLLogin';

export const LoginAPI = async (email: string, password: string): Promise<any> => {
    try {
      const response = await BaseURLLogin.post('/perpustakaan/api/v1/user/login', { email, password });
      const { data } = response;
      if (data.status && data.message === 'Success') {
        return data.data;
      } else {
        return Promise.reject();
      }
    } catch (error) {
      if (error instanceof AxiosError){
        return Promise.reject(error.response?.data.message) 
      }else {
        console.log(error);
      }
    }
  };
  
  export default LoginAPI;
  