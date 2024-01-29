import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function comandaCadastroService(comandaPayload) {
    const URL = `${BASE_URL}/comanda`;
  
    // Obtenha o token do armazenamento local (ou de onde você o está armazenando)
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(URL, comandaPayload, {
        headers: {
          'Authorization': `Bearer ${token}` // Adicione o token ao cabeçalho de autorização
        }
      });
  
      return response;
    } catch (error) {
      // Lide com erros aqui
      console.error('Erro na requisição:', error);
      throw error;
    }
}

async function excluiComandasService(id) {

  const URL = `${BASE_URL}/comanda/${id}`;

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


async function editaComandasService(id, dados) {

const URL = `${BASE_URL}/comanda/${id}`;

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

async function listagemComandasService() {
  const URL = `${BASE_URL}/comanda`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.get(URL,{
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

async function listagemComandasDataService(Data) {

  const URL = `${BASE_URL}/comanda/data`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.get(URL,{
          headers: {
          'Authorization': `Bearer ${token}`,
          },
          params: {
            data: Data
        }
      });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

async function faturamentoMesService(Data) {
  const URL = `${BASE_URL}/comanda/mes`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.get(URL,{
          headers: {
          'Authorization': `Bearer ${token}`,
          },
          params: {
            data: Data
        }
      });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

async function faturamentoSemanalService(Data) {
  const URL = `${BASE_URL}/comanda/semana`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.get(URL,{
          headers: {
          'Authorization': `Bearer ${token}`,
          },
          params: {
            data: Data
        }
      });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export {
  comandaCadastroService,
  editaComandasService,
  excluiComandasService,
  listagemComandasService,
  listagemComandasDataService,
  faturamentoMesService,
  faturamentoSemanalService
}