import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function funcionarioCargoService(cargo) {
    const URL = `${BASE_URL}/funcionario/cargo`;
  
    const token = localStorage.getItem('token');
  
    try {
        const response = await axios.get(URL,{
            headers: {
            'Authorization': `Bearer ${token}`,
            },
            params: {
                cargo: cargo.cargo
            }
        });
      return response;
    } catch (error) {
      // Lide com erros aqui
      console.error('Erro na requisição:', error);
      throw error;
    }
}

async function funcionariosService() {
  const URL = `${BASE_URL}/funcionarios`;

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

async function listagemFuncionariosService() {
  const URL = `${BASE_URL}/funcionario`;

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

async function editarFuncionariosService(id,dados) {
  const URL = `${BASE_URL}/funcionario/${id}`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.put(URL,dados,{
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

async function excluiFuncionariosService(id) {

  const URL = `${BASE_URL}/funcionario/${id}`;

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

export {
  funcionarioCargoService,
  funcionariosService,
  editarFuncionariosService,
  excluiFuncionariosService,
  listagemFuncionariosService
}