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
      console.log(error);
      return Promise.reject();
    }
  };
  
  export default LoginAPI;
  