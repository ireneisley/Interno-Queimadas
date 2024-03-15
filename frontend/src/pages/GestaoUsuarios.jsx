import { useState, useEffect, useContext } from 'react';
import { Flex, Box, Center, FormControl, HStack, Button, Image } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { listagemFuncionariosService,excluiFuncionariosService } from '../services/funcionarioService';
import { format } from 'date-fns';
import { MdEdit, MdDelete } from 'react-icons/md';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { showToastError, showToastSuccess } from '../utils/Toastify';
import UserContext from '../context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GestaoUsuarios() {
//-----------------------------------------------------Consts--------------------------------------------------------------
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [funcionarios, setFuncionarios] = useState([]);
//--------------------------------------------------- Handles -------------------------------------------------------
  const handleDelete = async (id) =>{
    try {
      const response = await excluiFuncionariosService(id);

      showToastSuccess("Excluiu com sucesso!");

      await fetchUsuarios();

    } catch(error){
      const messageError = error.response.data.mensagem;

      showToastError(messageError)

      console.log(error);
    }
  }

  const handleEditar = (id) => {
    history.push(`/editar-usuarios/${id}`);
  };

//---------------------------------------------------- Use Effect ----------------------------------------------------------
  const fetchUsuarios = async () => {
    try {
      const response = await listagemFuncionariosService();

      const funcionarios = response.data.map(funcionario => ({
        id:funcionario.id,
        nome: funcionario.nome,
        data_nascimento: format(new Date(funcionario.data_nascimento), 'dd/MM/yyyy'),
        email: funcionario.email,
        cpf_cnpj: funcionario.cpf_cnpj,
        celular: funcionario.celular,
        naturalidade: funcionario.naturalidade,
        cidade:funcionario.cidade,
        endereco:funcionario.endereco,
        cargo: funcionario.cargo
      }));

      setFuncionarios(funcionarios);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleAdmin = () => {
    history.push('/administrador')
  }


//------------------------------------------------------------------------ return -------------------------------------------------
  return (
    <Box h="100vh" position="relative">
      {/* Imagem para telas grandes */}
      <Image
        src="/queimadastour.png"
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
        bg="#E68854"
        color="white"
        _hover={{ bg: "blue.500" }}
        position="absolute"
        top={8}
        left={5}
        zIndex={1}
        onClick={ handleAdmin }
      >
        <ArrowLeftIcon />
      </Button>

      <Center
        as="header"
        h={140}
        bg="#E68854"
        color="white"
        fontWeight="bold"
        fontSize={{ base: 'xl', md: '4xl' }}
        pb="8"
      >
        {/* Título para telas grandes */}
        Gestão de Funcionarios
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
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {funcionarios.map(funcionario => (
              <Box key={funcionario.id} bg="gray.100" p="4" borderRadius="md" style={{ marginBottom: '12px' }}>
                <HStack spacing="4" justify="center">
                  <li key={funcionario.id}>
                    <strong>Nome:</strong> {funcionario.nome} - <strong>Email:</strong> {funcionario.email} - <strong>Data de Nascimento:</strong> {funcionario.data_nascimento} -  <strong>CPF: </strong> 
                    {funcionario.cpf_cnpj} <strong>Celular:</strong> {funcionario.celular} - <strong>Cargo:</strong> {funcionario.cargo} - <strong>Cidade:</strong> {funcionario.cidade} <strong>Endereço:</strong> {funcionario.endereco}
                  </li>
                  <Button
                    _hover={{ 
                      bg: "blue.300",
                      color: "white"
                    }}
                    onClick={() => handleEditar(funcionario.id)}
                  >
                    <MdEdit />
                  </Button>

                  <Button
                    _hover={{ 
                      bg: "red.400",
                      color: "white"
                    }}
                    onClick={() => handleDelete(funcionario.id)}
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

export default GestaoUsuarios;
