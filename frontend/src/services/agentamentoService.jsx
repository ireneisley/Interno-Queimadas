import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function listagemAgendamentosService() {
    const URL = `${BASE_URL}/agendamento`;
  
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

async function listagemAgendamentosBarbeiroSevice(id) {
  const URL = `${BASE_URL}/agendamento/${id}`;

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

async function excluiAgendamentosService(id) {

    const URL = `${BASE_URL}/agendamento/${id}`;
  
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


async function editaAgendamentosService(id, dados) {

  const URL = `${BASE_URL}/agendamento/${id}`;

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

async function listagemAgendamentosDataService(Data) {

  const URL = `${BASE_URL}/agendamentos/data`;

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

async function listagemAgendamentosFuncionariDataService(id,Data) {

  const URL = `${BASE_URL}/agendamentos/datas/${id}`;

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
    listagemAgendamentosService,
    excluiAgendamentosService,
    editaAgendamentosService,
    listagemAgendamentosBarbeiroSevice,
    listagemAgendamentosDataService,
    listagemAgendamentosFuncionariDataService
}