import axios from 'axios';

const BaseURLLogin = axios.create({
  baseURL: 'https://api.primaxcelinovasi.co.id',
});

export default BaseURLLogin;