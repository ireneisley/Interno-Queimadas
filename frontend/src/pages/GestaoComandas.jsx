import { useState, useEffect, useContext } from 'react';
import { Flex, Box, Center, FormControl, HStack, Button, Image, Text, IconButton, VStack } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { listagemComandasService, excluiComandasService } from '../services/comandaService';
import { MdEdit, MdDelete } from 'react-icons/md';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import UserContext from '../context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { showToastError, showToastSuccess } from "../utils/Toastify";

function GestaoComandas(){
  //-----------------------------------------------------Consts
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [comandas,setComandas] = useState([]);

  //--------------------------------------------------- Handles -------------------------------------------------------
  const handleDelete = async (id) =>{
    try {
      const response = await excluiComandasService(id);
  
      showToastSuccess("Excluiu com sucesso!");
  
      showToastSuccess("Comanda deletada com sucesso.");
      await fetchComandas();
  
    } catch(error) {
      const messageError = error.response.data.mensagem;

      showToastError(messageError)

      console.log(error);
    }
  }

  const handleEditar = (id) => {
    history.push(`/editar-comandas/${id}`);
  };

  const fetchComandas = async () => {
    try {
      const response = await listagemComandasService();
      const comandas_resposta = response.data.map(comanda => ({
        id: comanda.id,
        cliente_nome: comanda.cliente_nome,
        funcionario: comanda.barbeiro_nome,
        servicos: comanda.servicos,
        preco: comanda.preco,
        comissao: comanda.comissao,
        total_barberia: comanda.total_barberia
      }));
      setComandas(comandas_resposta);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComandas();
  }, []);
  
  const handleAdmin = () => {
    history.push('/administrador')
  }

  if (!user || user.cargo.toLowerCase() !== 'administrador') {
    history.push('/')
  }

  //------------------------------------------------------------------------ return -------------------------------------------------

  return (
    <div>
      <Box h="100vh" position="relative">
        {/* Imagem para telas grandes */}
        <Image
          src="/phio.jpeg"
          alt="Logo"
          h={{ base: 16, md: 32 }}
          maxW="100%"
          position="absolute"
          top={6}
          right={2}
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
        left={6}
        zIndex={2}
        onClick={ handleAdmin }
      >
        <ArrowLeftIcon />
      </Button>

        <Center
          as="header"
          h={140}
          bg="#52B587"
          color="white"
          fontWeight="bold"
          fontSize={{ base: 'xl', md: '4xl' }}
          pb="8"
        >
          {/* Título para telas grandes */}
          Gestão de Comandas
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
            <FormControl display="flex" flexDir="column" gap="6">
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {comandas.map(comanda => (
                  <Box key={comanda.id} bg="gray.100" p="4" borderRadius="md" mb="6">
                    <VStack spacing="4" align="stretch">
                      <Text>
                        <strong>Cliente:</strong> {comanda.cliente_nome}
                      </Text>
                      <Text>
                        <strong>Funcionário:</strong> {comanda.funcionario}
                      </Text>
                      <Text>
                        <strong>Serviços:</strong>{' '}
                        {comanda.servicos && comanda.servicos.length > 0 ? (
                          <span> {comanda.servicos.join(', ')} </span>
                        ) : (
                          <span>Nenhum serviço</span>
                        )}
                      </Text>
                      <Text>
                        <strong>Preço:</strong> {comanda.preco}
                      </Text>
                      <Text>
                        <strong>Total da Barberia:</strong> {comanda.total_barberia}
                      </Text>
                      <Text>
                        <strong>Comissão:</strong> {comanda.comissao}
                      </Text>
                      <HStack spacing="4" justify="center" mt="2">
                        <IconButton 
                          icon={<MdEdit />}
                          _hover={{ 
                            bg: "blue.300",
                            color: "white"
                          }}
                          onClick={() => handleEditar(comanda.id)} 
                        />

                        <IconButton 
                          icon={<MdDelete />}
                          _hover={{ 
                            bg: "red.400",
                            color: "white"
                          }}
                          onClick={() => handleDelete(comanda.id)} 
                        />
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </ul>
            </FormControl>
          </Center>
        </Flex>
        <ToastContainer />
      </Box>
    </div>
  )
}

export default GestaoComandas;
