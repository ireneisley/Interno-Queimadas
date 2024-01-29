import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function registerClienteService(registerCustomerPayload) {
  const URL = `${BASE_URL}/cliente`;
  const token = localStorage.getItem('token');

  const response = await axios.post(URL, registerCustomerPayload, {
    headers: {
      'Authorization': `Bearer ${token}` // Adicione o token ao cabeçalho de autorização
    }
  });

  return response;
}

export {
  registerClienteService
}
