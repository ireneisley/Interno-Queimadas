import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function agendarService(agendarPayload) {
  const URL = `${BASE_URL}/agendamento`;
  const token = localStorage.getItem('token');
  console.log("service",agendarPayload);

  try{
    const response = await axios.post(URL, agendarPayload);

    console.log("Response",response);

    return response;
  }catch(error){
    console.log(error);
  }
  

  
}

export {
  agendarService
}
