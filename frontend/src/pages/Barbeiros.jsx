import { Flex, Box, Center, FormControl, HStack, Button, Image } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

function Barbeiros() {
  const history = useHistory();

  const [id, setId] = useState(null);

  const { user, logOut } = useContext(UserContext);

  const handleAgendar = (id) => {
    history.push(`/agendamentos-funcionarios/${id}`)
  }

  const handleComandas = () => {
    history.push('/comanda')
  }

  useEffect(() => {
    // Obtém o token do localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Decodifica o token para obter as informações, incluindo o ID do usuário
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      setId(userId);
    }
  }, []);

  // if (!user) {
  //   history.push('/')
  // }

  // if (user.cargo.toLowerCase() !== 'barbeiro' && user.cargo.toLowerCase() !== 'administrador') {
  //   history.push('/')
  // }

  if (!user || user.cargo.toLowerCase() !== 'barbeiro') {
    history.push('/')
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
        top={4}
        left={4}
        zIndex={1}
      />

      <Button
        w={{ base: 90, md: 200 }}
        p="6"
        type="button"
        bg="gray.900"
        color="white"
        fontWeight="bold"
        fontSize="xl"
        mt="2"
        ml="2"
        _hover={{ bg: "red.500" }}
        h={{ base: 50, md: "auto"}}
        position="absolute"
        top={6} 
        right={4}
        zIndex={1}
        onClick={ logOut }
      >
        Sair
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
        {/* Título para telas grandes */}
        Barbeiro
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
            <HStack spacing="4" justify="center">
              <Button
                w={240}
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
                onClick={() => handleAgendar(id)}
              >
                Agendamentos
              </Button>
            </HStack>

            <HStack spacing="4" justify="center">
              <Button
                w={240}
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
                onClick={ handleComandas }
              >
                Comandas
              </Button>
            </HStack>

          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Barbeiros;
  