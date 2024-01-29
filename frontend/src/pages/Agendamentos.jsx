
import { useState, useEffect, useContext } from 'react';
import { Flex, Box, Center, FormControl, HStack, Button, Image, Input, Text } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { listagemAgendamentosService, excluiAgendamentosService, listagemAgendamentosDataService } from '../services/agentamentoService'
import { MdEdit, MdDelete } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon } from '@chakra-ui/icons';
import UserContext from '../context/UserContext';

function Agendamentos() {
  //--------------------------------------- Consts -------------------------------------------------------------------
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [agendamentos, setAgendamentos] = useState([]);
  const [Data, setData] = useState("");

//--------------------------------------------------- Handles -------------------------------------------------------
  const handleAgendar = () => {
    history.push('/agendar')
  }

  const handleComandas = () => {
    history.push('/comanda')
  }

  const handleDelete = async (id) =>{
    try {
      const response = await excluiAgendamentosService(id);

      showToastSuccess("Excluiu agendamento com sucesso.");

      await fetchAgendamentos();

    } catch(error) {
      const messageError = error.response.data.mensagem;

      showToastError(messageError)

      console.log(error);
    }
  }

  const handleEditar = (id) => {
    history.push(`/editar-agendamento/${id}`);
  };

  const handleAgendamentoPorData = async () => {
    const dataFormatada = formatarDataBrasileira(Data);

    try {
      const response = await listagemAgendamentosDataService(dataFormatada);

      const agendamento = response.data.map(ag => ({
        id:ag.id,
        data_marcacao: ag.data_marcacao,
        hora_inicio: ag.hora_inicio,
        hora_termino: ag.hora_termino,
        cliente_nome: ag.nome_cliente,
        barbeiro_nome: ag.barbeiro_nome,
        servico: ag.servicos
      }));

      setAgendamentos(agendamento);
    } catch(error) {
      console.error(error);
    }
  }

  const handleLogin = () => {
    history.push('/administrador')
  }
//------------------------------------------------------- Funções --------------------------------------------------------
  const formatarDataBrasileira = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

//---------------------------------------------------- Use Effect ----------------------------------------------------------
  const fetchAgendamentos = async () => {
    try {
      const response = await listagemAgendamentosService();
      const agendamento = response.data.map(ag => ({
        id:ag.id,
        data_marcacao:ag.data_marcacao,
        hora_inicio: ag.hora_inicio,
        hora_termino: ag.hora_termino,
        cliente_nome: ag.nome_cliente,
        barbeiro_nome: ag.barbeiro_nome,
        servico: ag.servicos
      }));
      setAgendamentos(agendamento);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []); 

  if (!user || user.cargo.toLowerCase() !== 'administrador') {
    history.push('/')
  }

//------------------------------------------------------------------------ return -------------------------------------------------
  return (
    <Box h="100vh" position="relative">
      <Image 
        src="/sky.jpeg" 
        alt="Logo" 
        h={{ base: 16, md: 32 }} 
        position="absolute" 
        top={7} 
        right={7}
        zIndex={1} 
      />

      <Button
        w={{ base: 70, md: 0 }}
        p="4"
        type="button"
        bg="gray.900"
        color="white"
        _hover={{ bg: "blue.500" }}
        position="absolute"
        top={9}
        left={6}
        zIndex={1}
        onClick={ handleLogin }
      >
        <ArrowLeftIcon />
      </Button>

      <Center
        as="header"
        h={150}
        bg="black"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        Agendamentos
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
          <FormControl display="flex" flexDir="column" gap="4">
            <Box>
              <Text>Data:</Text>
              <Input type="date" value={Data} onChange={(e) => setData(e.target.value)} />
              <Button
                _hover={{ 
                  bg: "blue.600",
                  color: "white"
                }}
                onClick={() => handleAgendamentoPorData()}
              >
                Agendamentos Por Data
              </Button>
            </Box>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              { agendamentos.map(agendamento => (
              <Box key={ agendamento.id } bg="gray.100" p="4" borderRadius="md" style={{ marginBottom: '12px' }}>
                <HStack spacing="4" justify="center">
                  <li>
                    <strong>Nome Cliente:</strong> { agendamento.cliente_nome } - <strong>Data Marcação:</strong> { agendamento.data_marcacao } - <strong>Nome Funcionário:</strong> { agendamento.barbeiro_nome } -  <strong>Serviços: </strong> 
                    { agendamento.servico && agendamento.servico.length > 0 ? (
                      <span> {agendamento.servico.join(', ')} </span>
                    ) : (
                      <span>Nenhum serviço</span>
                    )}
                    <strong>Horário Inicio:</strong> { agendamento.hora_inicio } - <strong>Horário Termino:</strong> { agendamento.hora_termino }
                  </li>

                  <Button
                    _hover={{ 
                      bg: "blue.300",
                      color: "white"
                    }}
                    onClick={() => handleEditar(agendamento.id)}
                  >
                    <MdEdit />
                  </Button>

                  <Button
                    _hover={{ 
                      bg: "red.400",
                      color: "white"
                    }}
                    onClick={() => handleDelete(agendamento.id)}
                  >
                    <MdDelete />
                  </Button>
                </HStack>
              </Box>
              ))}
            </ul>

            <HStack spacing="4" justify="center">
              <Button
                w={240}
                p="6"
                type="submit"
                bg="black"
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                ml="2"
                _hover={{ bg: "gray.900" }}
                h="auto"
                onClick={ handleAgendar }
              >
                Agendar
              </Button>
            </HStack>

            <HStack spacing="4" justify="center">
              <Button
                w={240}
                p="6"
                type="submit"
                bg="black"
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                ml="2"
                _hover={{ bg: "gray.900" }}
                h="auto"
                onClick={ handleComandas }
              >
                Comandas
              </Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>

      <ToastContainer />
    </Box>
  );
}

export default Agendamentos;
