import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function agendarService(agendarPayload) {
  const URL = `${BASE_URL}/agendamento`;
  const token = localStorage.getItem('token');

  const response = await axios.post(URL, agendarPayload, {
    headers: {
      'Authorization': `Bearer ${token}` // Adicione o token ao cabeçalho de autorização
    }
  });

  return response;
}

export {
  agendarService
}
