import { useState, useEffect, useContext } from 'react';
import { Flex, Box, Center, FormControl, HStack, Button,Image } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { listagemClientesService, excluiClienteService } from '../services/clienteService';
import { format } from 'date-fns';
import { MdEdit, MdDelete } from 'react-icons/md';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import UserContext from '../context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { showToastError, showToastSuccess } from "../utils/Toastify";

function GestaoClientes (){
//-----------------------------------------------------Consts
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [clientes,setClientes] = useState([]);

  const formatarData = data => (data ? format(new Date(data), 'dd/MM/yyyy') : 'Não informada')

//--------------------------------------------------- Handles -------------------------------------------------------
  const handleDelete = async (id) =>{

    try {
  
      const response = await excluiClienteService(id);
  
      showToastSuccess("Cliente deletado com sucesso.");
  
      await fetchClientes();
  
    } catch(error){
      const messageError = error.response.data.mensagem;

      showToastError(messageError);

      console.log(error);
    }
  }
  
  const handleEditar = (id) => {
    history.push(`/editar-clientes/${id}`);
  };

//---------------------------------------------------- Use Effect ----------------------------------------------------------
  const fetchClientes = async () => {
    try {
      const response = await listagemClientesService();
      const clientes_resposta = response.data.map(cliente => ({
        id:cliente.id,
        nome: cliente.nome,
        data_nascimento: formatarData(cliente.data_nascimento),
        data_cadastro: formatarData(cliente.data_cadastro),
        email: cliente.email,
        cpf_cnpj: cliente.cpf_cnpj,
        celular: cliente.celular,
        naturalidade: cliente.naturalidade,
        cidade:cliente.cidade,
        endereco:cliente.endereco,
        instagram: cliente.instagram
      }));
      setClientes(clientes_resposta);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchClientes();
  }, []);
  
  const handleAdmin = () => {
    history.push('/administrador')
  }

  if (!user || user.cargo.toLowerCase() !== 'administrador') {
    history.push('/')
  }

  //------------------------------------------------------------------------ return -------------------------------------------------
  return (
      <Box h="100vh" position="relative">
        {/* Imagem para telas grandes */}
        <Image
          src="/sky.jpeg"
          alt="Logo"
          h={{ base: 20, md: 32 }}
          maxW="100%"
          position="absolute"
          top={3}
          right={3}
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
        top={8}
        left={4}
        zIndex={1}
        onClick={ handleAdmin }
      >
        <ArrowLeftIcon />
      </Button>

        <Center
          as="header"
          h={140}
          bg="black"
          color="white"
          fontWeight="bold"
          fontSize={{ base: 'xl', md: '4xl' }}
          pb="8"
        >
          {/* Título para telas grandes */}
          Gestão de Clientes
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
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {clientes.map(clientes => (
                    <Box key={clientes.id} bg="gray.100" p="4" borderRadius="md" style={{ marginBottom: '12px' }}>
                      <HStack spacing="4" justify="center">
                        <li key={clientes.id}>
                          <strong>Nome:</strong> {clientes.nome} - <strong>Email:</strong> {clientes.email} - <strong>Data de Nascimento:</strong> {clientes.data_nascimento} -  <strong>CPF: </strong> 
                          {clientes.cpf_cnpj} <strong>Celular:</strong> {clientes.celular} - <strong>Instagram:</strong> {clientes.instagram} - <strong>Cidade:</strong> {clientes.cidade} - <strong>Endereço:</strong> {clientes.endereco} - <strong>Cliente desde:</strong> {clientes.data_cadastro}
                        </li>
                        <Button
                          _hover={{ 
                            bg: "blue.300",
                            color: "white"
                          }}
                          onClick={() => handleEditar(clientes.id)}
                        >
                          <MdEdit />
                        </Button>

                        <Button
                          _hover={{ 
                            bg: "red.400",
                            color: "white"
                          }}
                          onClick={() => handleDelete(clientes.id)}
                        >
                          <MdDelete />
                        </Button>
                      </HStack>
                    </Box>
                    ))}
                  </ul>
              </FormControl>
            </Center>
          </Flex>
          <ToastContainer />
      </Box>
  )
}

export default GestaoClientes;
