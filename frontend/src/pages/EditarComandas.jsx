import { Box, Center, FormControl, FormLabel, Button, HStack, Image, Flex, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { editaComandasService } from '../services/comandaService';
import { listagemServicoService } from "../services/servicoService"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../context/UserContext";

function EditarComandas() {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const { id } = useParams();

  const [clienteNome, setClienteNome] = useState('');
  const [servicos, setServicos] = useState('');
  const [preco, setPreco] = useState(null);
  const [Id, setId] = useState(null);

  const [servicosOptions, setServicosOptions] = useState([]);
  const [funcionariosOptions, setFuncionariosOptions] = useState([]);

  const handleEditar = async () => {
    try {
      const response = await editaComandasService(Id, {
        cliente_nome:clienteNome,
        servicos,
        preco,
      });

      if (response) {
        showToastSuccess("Comanda atualizada com sucesso")
      }

    } catch (e) {
      const messageError = e.response.data.mensagem;

      showToastError(messageError) //! Toastify disparando um alerta de erro

      console.log(e);
    }
  }

  const handleSelectChange = (selectedOptions) => {
    let response = [];

    for(let opt of selectedOptions){
      response.push(opt.value);
    }

    setServicos(response);
  };

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
          h={{ base: 16, md: 32 }}
          position="absolute" 
          top={6} 
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
          top={9}
          left={8}
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
          fontSize={{ base: '2xl', md: '4xl' }}
          pb="8"
        >
          Editar Comanda
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
              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="nome" fontWeight="bold" fontSize="xl">Serviço</FormLabel>
                  <Select options={servicosOptions} 
                        isMulti
                        onChange={handleSelectChange}/>
                </Box>
              </HStack>

              <HStack 
                flexWrap="wrap"
                spacing={{ base: "2", md: "4" }}
              >
                <Box w="100%">
                  <FormLabel htmlFor="nome" fontWeight="bold" fontSize="xl">Cliente</FormLabel>
                  <Input 
                    id="nome"
                    placeholder="Digite o nome do cliente"
                    value={ clienteNome || '' }
                    onChange={ ({ target: { value } }) => setClienteNome(value) }
                  />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="preco" fontWeight="bold" fontSize="xl">Preço</FormLabel>
                  <Input 
                    id="preco"
                    placeholder="Digite o preço do serviço"
                    value={ preco || ''}
                    onChange={ ({ target: { value } }) => setPreco(value) }
                  />
                </Box>
              </HStack>

              <HStack justify="center">
                <Flex justify="space-between">
                  <Button
                    w={{ base: 150, md: 240 }}
                    p="6"
                    type="submit"
                    bg="black" // Alteração aqui para cor preta
                    color="white"
                    fontWeight="bold"
                    fontSize="xl"
                    mt="2"
                    onClick={ handleEditar }
                    _hover={{ bg: "gray.900" }}
                    h="auto"
                  >
                    Salvar
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

export default EditarComandas;
