import { Flex, Box, Center, FormControl, Input, FormLabel, HStack, Button, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { loginService } from "../services/loginService";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastDefault, showToastError } from "../utils/Toastify";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import UserContext from "../context/UserContext";

function Login() {
  const history = useHistory();

  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordShow() {
    setShowPassword(!showPassword);
  }

  const redirectAdmin = (cargo) => {
    if (cargo.toLowerCase() === 'administrador') {
      history.push('/administrador')
    }
  }

  const redirectBarbeiro = (cargo) => {
    if (cargo.toLowerCase() === 'barbeiro') {
      history.push('/barbeiro')
    }
  }

  const redirectManicure = (cargo) => {
    if (cargo.toLowerCase() === 'manicure') {
      history.push('/manicure')
    }
  }

  const redirectCabeleireiro = (cargo) => {
    if (cargo.toLowerCase() === 'cabeleireiro(a)') {
      history.push('/cabeleireiro')
    }
  }

  const redirectUser= (cargo)  => {
    redirectAdmin(cargo)
    redirectBarbeiro(cargo)
    redirectManicure(cargo)
    redirectCabeleireiro(cargo)
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      const { cargo } = userData;

      redirectUser(cargo)
    }
  }, []);

  const handleLoginBtn = async () => {
    try {
      showToastDefault('Verificando dados!')
      const response = await loginService({
        email,
        senha,
      })

      localStorage.setItem('user', JSON.stringify(response.data.usuario));
      
      setUser(response.data.usuario);

      redirectUser(response.data.usuario.cargo);
    } catch (e) {
      const messageError = e.response.data.mensagem;

      showToastError(messageError) //! Toastify disparando um alerta de erro

      console.log(e)
    }
  }

  const handleCadastrar = () => {
    history.push('/cadastro')
  }

  return (
    <Box h="100vh" position="relative">
      {/* Imagem para telas grandes */}
      <Image
        src="/sky.jpeg"
        alt="Logo"
        h={{ base: 20, md: 32 }}
        maxW="100%"
        position="absolute"
        top={{ base: 4, md: 2}}
        left={4}
        zIndex={1}
      />

      <Center
        as="header"
        h={140}
        bg="black"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '3xl', md: '4xl' }}
        pb="8"
      >
        {/* Título para telas grandes */}
        Login
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
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={ email }
                  onChange={ ({ target: { value } }) => setEmail(value) } 
                />
              </Box>

              <Box position="relative" w="100%">
                <FormLabel htmlFor="senha">Senha</FormLabel>
                {/* backgroundColor="red" */}
                <Input 
                  id="senha" 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={ senha }
                  onChange={ ({ target: { value } }) => setSenha(value) } 
                />
                
                <Button
                  position="absolute"
                  right="3"
                  bottom="1.5"
                  h="1.75rem"
                  size="sm"
                  bg="gray.400"
                  color="black"
                  _hover={{ 
                    bg: "gray.500",
                    color: "white" 
                  }}
                  onClick={ handlePasswordShow }
                >
                  { showPassword ? <ViewOffIcon /> : <ViewIcon /> }
                </Button>
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
                  ml="2"
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ handleLoginBtn }
                >
                  Entrar
                </Button>
              </Flex>

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
                  ml="2"
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ handleCadastrar }
                >
                  Cadastrar
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

export default Login;
