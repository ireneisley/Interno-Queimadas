import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function loginService(loginPayload) {
  const URL = `${BASE_URL}/login`;
  const response = await axios.post(URL, loginPayload);
  const token = response.data.token;
  localStorage.setItem('token', token);
  return response;
}

export {
  loginService
}
