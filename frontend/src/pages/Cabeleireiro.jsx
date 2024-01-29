import { Flex, Box, Center, FormControl, HStack, Button, Image } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import UserContext from "../context/UserContext";

function Cabeleireiro() {
  const history = useHistory();

  const [id, setId] = useState(null);

  const { user, logOut } = useContext(UserContext);

  const handleAgendar = () => {
    history.push(`/agendamentos-funcionarios/${id}`)
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

  const handleComandas = () => {
    history.push('/comanda')
  }

  if (!user || user.cargo.toLowerCase() !== 'cabeleireiro(a)') {
    history.push('/')
  }

  return (
    <Box h="100vh" position="relative">
      {/* Adiciona a logo no canto esquerdo da tela */}
      <Image src="/sky.jpeg" alt="Logo" h={{ base: 20, md: 32 }} position="absolute" top={4} left={4} />

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
        zIndex={2}
        onClick={ logOut }
      >
        Sair
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
        Cabeleireiro
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
          top={100}
          position="absolute"
          borderRadius={5}
          p="6"
          boxShadow="0 1px 2px #ccc"
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
                onClick={ handleAgendar }
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

            <HStack justify="center">
              <Flex justify="space-between">

              </Flex>
            </HStack>

          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Cabeleireiro;
  