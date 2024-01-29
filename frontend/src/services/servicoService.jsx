import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function listagemServicoService() {
    const URL = `${BASE_URL}/servico`;
  
    const token = localStorage.getItem('token');
  
    try {
        const response = await axios.get(URL,{
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        });
      return response;
    } catch (error) {
    
      console.error(error);
      throw error;
    }
}

async function listagemPrecoService(servico) {
    const URL = `${BASE_URL}/servico/preco`;
  
    const token = localStorage.getItem('token');
  
    try {
        const response = await axios.get(URL,{
            headers: {
            'Authorization': `Bearer ${token}`,
            },
            params: {
                nome: servico.servico
            }
        });
      return response;
    } catch (error) {
    
      console.error(error);
      throw error;
    }
  }

export {
    listagemServicoService,
    listagemPrecoService
}