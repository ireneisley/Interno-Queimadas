import { Flex, Box, Center, Button, Image } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";
import React from 'react';
 //primeiro andar (falta)
function Mapas6() {
  const history = useHistory();
  const { user, logOut } = useContext(UserContext);

  const handleCadastroFuncionarios = () => {
    history.push('/cadastro-funcionario');
  }

  const handleComanda = () => {
    history.push('/gestao-comandas');
  }

  const handleFinanceiro = () => {
    history.push('/financeiro');
  }

  const handleGestaoUsuarios = () => {
    history.push('/gestao-usuarios');
  }

  const handleAgendamentos = () => {
    history.push('/agendamentos');
  }

  const handleAgendar = () => {
    history.push('/');
  }

  const buttonLabels = [
    "03", "07", "11", "15", "19",
    "23", "27", "31", "35", "39",
    "43", "47", "04", "08", "12",
    "16", "20", "24", "28", "32",
    "36", "40", "44", "48", "02",
    "06", "10", "14", "18", "22",
    "26", "30", "34", "38", "42",
    "46", "50", "01", "05", "09",
    "13", "17", "21", "25", "29",
    "33", "37", "41", "45", "49",
  ];

  return (
    <Box h="100vh" position="relative">
      <Image 
        src="/queimadastour.png" 
        alt="Logo" 
        h={{ base: 20, md: 32 }}
        maxW="100%"
        position="absolute" 
        top={{ base: 4, md: 2}} 
        left={4} 
        zIndex={1} 
      />

      <Button
        p="1"
        type="button"
        bg="#E68854"
        color="white"
        fontWeight="bold"
        fontSize="sm"
        mt="2"
        ml="2"
        _hover={{ bg: "red.500" }}
        h="auto"
        w="40px"
        position="absolute"
        top={6}
        right={2}
        zIndex={1}
        onClick={logOut}
      >
        Sair
      </Button>

      <Center
        as="header"
        h={140}
        bg="#E68854"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        POLTRONAS 
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
          flexDirection="column"
        >
          <Flex justifyContent="center" mt={2}>
            {[...Array(12)].map((_, colIndex) => (
              <Button
                key={colIndex}
                p="1"
                type="submit"
                bg="#E68854"
                color="white"
                fontWeight="bold"
                fontSize="sm"
                m="1"
                _hover={{ bg: "gray.900" }}
                h="40px"
                w="40px"
                // onClick={() => handleButtonClick(colIndex)} REMOVIDO
              >
                {buttonLabels[colIndex]}
              </Button>
            ))}
          </Flex>
          <Flex justifyContent="center" mt={2}>
            {[...Array(12)].map((_, colIndex) => (
              <Button
                key={colIndex + 12}
                p="1"
                type="submit"
                bg="#E68854"
                color="white"
                fontWeight="bold"
                fontSize="sm"
                m="1"
                _hover={{ bg: "gray.900" }}
                h="40px"
                w="40px"
                // onClick={() => handleButtonClick(colIndex + 12)} REMOVIDO
              >
                {buttonLabels[colIndex + 12]}
              </Button>
            ))}
          </Flex>
          <Box mt={8}></Box>
          <Flex justifyContent="center" mt={2}>
            {[...Array(13)].map((_, colIndex) => (
              <Button
                key={colIndex + 24}
                p="1"
                type="submit"
                bg="#E68854"
                color="white"
                fontWeight="bold"
                fontSize="sm"
                m="1"
                _hover={{ bg: "gray.900" }}
                h="40px"
                w="40px"
                // onClick={() => handleButtonClick(colIndex + 24)} REMOVIDO
              >
                {buttonLabels[colIndex + 24]}
              </Button>
            ))}
          </Flex>
          <Flex justifyContent="center" mt={2}>
            {[...Array(13)].map((_, colIndex) => (
              <Button
                key={colIndex + 37}
                p="1"
                type="submit"
                bg="#E68854"
                color="white"
                fontWeight="bold"
                fontSize="sm"
                m="1"
                _hover={{ bg: "gray.900" }}
                h="40px"
                w="40px"
                // onClick={() => handleButtonClick(colIndex + 37)} REMOVIDO
              >
                {buttonLabels[colIndex + 37]}
              </Button>
            ))}
          </Flex>
        </Center>
      </Flex>
    </Box>
  );
}

export default Mapas6;
