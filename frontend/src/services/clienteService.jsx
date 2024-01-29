import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function listagemClientesService() {
    const URL = `${BASE_URL}/cliente`;
  
    const token = localStorage.getItem('token');
  
    try {
        const response = await axios.get(URL,{
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        });
      return response;
    } catch (error) {
      // Lide com erros aqui
      console.error('Erro na requisição:', error);
      throw error;
    }
}

async function excluiClienteService(id) {


    const URL = `${BASE_URL}/cliente/${id}`;
  
    const token = localStorage.getItem('token');
  
    try {
        const response = await axios.delete(URL,{
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        });
      return response;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
}

async function editaClienteService(id,dados) {

    const URL = `${BASE_URL}/cliente/${id}`;
  
    const token = localStorage.getItem('token');
  
    try {
        const response = await axios.put(URL,dados,{
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        });
      return response;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
}

export{
    listagemClientesService,
    excluiClienteService,
    editaClienteService
}