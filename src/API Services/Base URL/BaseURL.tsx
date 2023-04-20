import axios, { AxiosInstance } from 'axios';

const BaseURL: AxiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
});

export default BaseURL;