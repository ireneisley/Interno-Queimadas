import { Box, Center, FormControl, FormLabel, Button, HStack, Image, Flex, Input} from "@chakra-ui/react";
import Select from 'react-select';
// import InputMask from 'react-input-mask';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editaAgendamentosService } from '../services/agentamentoService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { listagemServicoService } from "../services/servicoService"
import { funcionariosService } from "../services/funcionarioService"
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../context/UserContext";

function EditarAgendamento() {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const { id } = useParams();

  const [agendamento, setAgendamento] = useState(null);
  const [nomeBarbeiro, setNomeBarbeiro] = useState('');
  const [servicos, setServicos] = useState([]);
  const [dataMarcacao, setDataMarcacao] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaTermino, setHoraTermino] = useState('');
  const [Id,setId]= useState(null);

  const [servicosOptions, setServicosOptions] = useState([]);
  const [funcionariosOptions, setFuncionariosOptions] = useState([]);
  
  const fetchAgendamentoById = async () => {
    try {
      setId(id);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchAgendamentoById();
  }, [id]); 

  useEffect(() => {
    const fetchServicosOptions = async () => {
      try {
        const response = await listagemServicoService();

        const servicos = response.data.map(servico => ({
          value: servico.nome,
          label: servico.nome
        }));

        setServicosOptions(servicos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServicosOptions();
  }, []); 

  useEffect(() => {
    const fetchServicosOptions2 = async () => {
      try {
        const response = await funcionariosService();
        const funcionarios = response.data.map(funcionario => ({
          value: funcionario.nome,
          label: funcionario.nome
        }));
        setFuncionariosOptions(funcionarios);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServicosOptions2();
  }, []); 

  const handleSelectChange = (selectedOptions) => {
    let response = [];

    for(let opt of selectedOptions){
      response.push(opt.value);
    }

    setServicos(response);
  };

  const handleSelectFuncionariosChange = (selectedOptions) => {
    setNomeBarbeiro(selectedOptions.value);
  };

  const handleAgendar = async() => {
    try {
      const response = await editaAgendamentosService(Id, {
          nome_barbeiro:nomeBarbeiro,
          servicos,
          data_marcacao:dataMarcacao,
          hora_inicio:horaInicio,
          hora_termino:horaTermino
      });
  
      if (response) {
          showToastSuccess("Agendamento atualizado.")
      }
  
    } catch (e) {
      const messageError = e.response.data.mensagem;
  
      showToastError(messageError) //! Toastify disparando um alerta de erro
  
      console.log(e);
    }
  }

  const handleCadastroCliente = () => {
    history.push('/cadastro-cliente')
  }

  const handleLogin = () => {
    history.push('/')
  }

  return (
    <div>
      <Box h="100vh" position="relative">
      {/* Adiciona a logo no canto esquerdo da tela */}
      <Image 
        src="/sky.jpeg" 
        alt="Logo" 
        h={{ base: 20, md: 32 }}
        position="absolute" 
        top={4} 
        right={4}
        zIndex={1}
      />

      <Button
        // w={200}
        p="4"
        type="button"
        bg="gray.900"
        color="white"
        _hover={{ bg: "blue.500" }}
        position="absolute"
        top={8}
        left={10}
        onClick={ handleLogin }
      >
        <ArrowLeftIcon />
      </Button>
  
      <Center
        as="header"
        h={140}
        bg="black"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '3xl', md: '4xl' }}
        pb="8"
      >
        Agendar
      </Center>

      <Flex
        align="center"
        justify="center"
        bg="blackAlpha.200"
        h="calc(100vh - 150px)"
      >
        <Center
          w="100%"
          maxW={840}
          bg="white"
          top={{ base: 50, md: '100px' }}
          position="absolute"
          borderRadius={5}
          p="6"
          boxShadow="0 1px 2px #ccc"
          mt={{ base: 50, md: 0 }}
        >
          <FormControl 
            display="flex" 
            flexDir="column" 
            gap="4"
          >
            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="barbeiro" fontWeight="bold" fontSize="xl">Funcionário</FormLabel>
                  <Select options={funcionariosOptions} 
                     onChange={handleSelectFuncionariosChange}/>
                </Box>
              </HStack>
              <Box w="100%">
                <FormLabel htmlFor="nome" fontWeight="bold" fontSize="xl">Serviço</FormLabel>
                <Select options={servicosOptions} 
                     isMulti
                     onChange={handleSelectChange}/>
              </Box>
            </HStack>

            <HStack>
              <HStack flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}>
                <Box w="100%">
                  <FormLabel htmlFor="startTime" fontWeight="bold" fontSize="xl">Hora de Início</FormLabel>
                  <input type="time" id="startTime" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="endTime" fontWeight="bold" fontSize="xl">Hora de Término</FormLabel>
                  <input type="time" id="endTime" value={horaTermino} onChange={(e) => setHoraTermino(e.target.value)} required />
                </Box>
                <Box w="100%">
                <FormLabel htmlFor="nasc" fontWeight="bold" fontSize="xl">Data</FormLabel>
                <Input id="nasc" type="date" value = {dataMarcacao} onChange={(e) => setDataMarcacao(e.target.value)}/>
              </Box>
              </HStack>
            </HStack>
            <HStack justify="center">
              <Flex justify="space-between">
                <Button
                  w={{ base: 200, md: 240 }}
                  p="6"
                  type="submit"
                  bg="black"
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  onClick={ handleAgendar }
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                >
                  Salvar
                </Button>
              </Flex>
            </HStack>

            <HStack justify="center">
              <Flex justify="space-between">
                <Button
                  w={{ base: 200, md: 240 }}
                  p="6"
                  type="submit"
                  bg="black"
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ handleCadastroCliente }
                >
                  Cadastrar Cliente
                </Button>
              </Flex>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
      <ToastContainer />
    </div>
  );
}

export default EditarAgendamento;