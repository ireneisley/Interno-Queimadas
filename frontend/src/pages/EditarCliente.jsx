import { Box, Center, FormControl, FormLabel, Button, HStack, Image, Flex, Input } from "@chakra-ui/react";
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editaClienteService } from '../services/clienteService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../context/UserContext";
import InputMask from 'react-input-mask';

function EditarCliente () {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const { id } = useParams();

  const [nome, setNome] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [celular, setCelular] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [dataCadastro, setDataCadastro] = useState('')
  const [naturalidade,setNaturalidade] = useState('');

  const handleEditar = async () => {
    try {
      const response = await editaClienteService(id, {
        nome,
        instagram,
        email,
        cpf_cnpj: cpfCnpj,
        celular,
        data_cadastro: dataCadastro,
        data_nascimento: dataNascimento,
        naturalidade,
        cidade,
        endereco
      });

      if (response) {
        showToastSuccess("Cliente atualizado com sucesso")
      }

    } catch (e) {
      const messageError = e.response.data.mensagem;

      showToastError(messageError) //! Toastify disparando um alerta de erro

      console.log(e);
    }
  }

  const handleLogin = () => {
    history.push('/')
  }

  if (!user || user.cargo.toLowerCase() !== 'administrador') {
    history.push('/')
  }

  return(
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
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        Edição Cliente
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
            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w="100%">
                <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                <Input 
                  id="nome"
                  type="text"
                  placeholder="Nome do cliente"
                  value={ nome }
                  onChange={ ({ target: { value } }) => setNome(value) }
                />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="E-mail do cliente"
                  value={ email }
                  onChange={ ({ target: { value } }) => setEmail(value) } 
                />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="nome">Instagram</FormLabel>
                <Input 
                  id="instagram"
                  type="text"
                  placeholder="Instagram do cliente"
                  value={ instagram }
                  onChange={ ({ target: { value } }) => setInstagram(value) }
                />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="cpfCnpj">CPF/CNPJ</FormLabel>
                <InputMask
                  mask="999.999.999-99"
                  maskChar="_"
                  value={cpfCnpj}
                  onChange={({ target: { value } }) => setCpfCnpj(value)}
                >
                  {(inputProps) => <Input {...inputProps} id="cpfCnpj" placeholder="Seu CPF ou CNPJ" />}
                </InputMask>
              </Box>
            </HStack>

            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w="100%">
                <FormLabel htmlFor="nasc">Data de Nascimento</FormLabel>
                <Input 
                  id="nasc" 
                  type="date" 
                  value={ dataNascimento } 
                  onChange={ ({ target: { value } }) => setDataNascimento(value) } 
                />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="nasc">Cliente Desde</FormLabel>
                <Input 
                  id="datacadastro" 
                  type="date" 
                  value={ dataCadastro } 
                  onChange={ ({ target: { value } }) => setDataCadastro(value) } 
                />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="natural">Naturalidade</FormLabel>
                <Input 
                  id="natural"
                  type="text"
                  placeholder="Cidade natal do cliente"
                  value={ naturalidade } 
                  onChange={ ({ target: { value } }) => setNaturalidade(value) } 
                />
              </Box>
            </HStack>

            <HStack spacing="4">
            <Box w="100%">
              <FormLabel htmlFor="cel">Celular</FormLabel>
              <InputMask
                mask="(99) 99999-9999"
                maskChar="_"
                value={celular}
                onChange={({ target: { value } }) => setCelular(value)}
              >
                {(inputProps) => <Input {...inputProps} id="cel" placeholder="Digite seu Celular" />}
              </InputMask>
            </Box>
            </HStack>

            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w="100%">
                <FormLabel htmlFor="endereco">Endereço</FormLabel>
                <Input 
                  id="endereco"
                  type="text"
                  placeholder="Endereço do cliente"
                  value={ endereco } 
                  onChange={ ({ target: { value } }) => setEndereco(value) } 
                />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="cidade">Cidade</FormLabel>
                <Input 
                  id="cidade"
                  type="text"
                  placeholder="Cidade onde o cliente reside"
                  value={ cidade } 
                  onChange={ ({ target: { value } }) => setCidade(value) } 
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
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ handleEditar }
                >
                  Salvar
                </Button>
              </Flex>
            </HStack>
          </FormControl>
        </Center>
      </Flex>

      <ToastContainer />
    </Box>
  );
}

export default EditarCliente;
