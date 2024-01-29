import { Flex, Box, Center, FormControl, Input, FormLabel, HStack, RadioGroup, Radio, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { registerService } from "../services/registerService";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function Cadastro() {
  const history = useHistory();

  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [naturalidade, setNaturalidade] = useState('');
  const [celular, setCelular] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cargo, setCargo] = useState('')

  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordShow() {
    setShowPassword(!showPassword);
  }

  const registerNewUser = async () => {
    try {
      const response = await registerService({
        nome,
        senha,
        email,
        cpf_cnpj: cpfCnpj,
        data_nascimento: dataNascimento,
        celular,
        naturalidade,
        cidade, 
        endereco,
        cargo
      });

      if (response) {
        showToastSuccess("Usuario cadastrado com sucesso")
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
        zIndex={2}
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
        {/* Título para telas grandes */}
        Cadastrar
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
            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                <Input 
                  id="nome"
                  type="text"
                  placeholder="Digite seu Nome"
                  value={ nome }
                  onChange={ ({ target: { value } }) => setNome(value) }
                />
              </Box>

              <Box 
                position="relative" 
                w={{ base: "100%", md: "48%" }}
              >
                <FormLabel htmlFor="senha">Senha</FormLabel>
                <Input 
                  id="senha"
                  placeholder="Sua Senha"
                  type={ showPassword ? 'text' : 'password' }
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

              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="Digite seu E-mail"
                  value={ email }
                  onChange={ ({ target: { value } }) => setEmail(value) } 
                />
              </Box>

              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="email">CPF/CNPF</FormLabel>
                <Input 
                  id="email" 
                  type="text"
                  placeholder="Seu CPF ou CNPJ"
                  value={ cpfCnpj }
                  onChange={ ({ target: { value } }) => setCpfCnpj(value) } 
                />
              </Box>
            </HStack>

            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="nasc">Data de Nascimento</FormLabel>
                <Input 
                  id="nasc" 
                  type="date"
                  value={ dataNascimento }
                  onChange={ ({ target: { value } }) => setDataNascimento(value) }
                />
              </Box>

              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="natural">Naturalidade</FormLabel>
                <Input 
                  id="natural"
                  type="text"
                  placeholder="Digite sua cidade natal"
                  value={ naturalidade }
                  onChange={ ({ target: { value } }) => setNaturalidade(value) }
                />
              </Box>
            </HStack>

            <HStack spacing="4">
              <Box w="100%">
                <FormLabel htmlFor="cel">Celular</FormLabel>
                <Input 
                  id="cel" 
                  type="text"
                  placeholder="(99) 99999-9999"
                  mask="(99) 99999-9999"
                  value={ celular }
                  onChange={ ({ target: { value } }) => setCelular(value) } 
                />
              </Box>
            </HStack>

            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="endereco">Endereço</FormLabel>
                <Input 
                  id="endereco"
                  type="text"
                  placeholder="Digite seu Endereço"
                  value={ endereco }
                  onChange={ ({ target: { value } }) => setEndereco(value) }
                />
              </Box>
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="cidade">Cidade</FormLabel>
                <Input 
                  id="cidade"
                  type="text"
                  placeholder="Cidade onde reside"
                  value={ cidade }
                  onChange={ ({ target: { value } }) => setCidade(value) }
                />
              </Box>
            </HStack>

            <HStack spacing="4">
              <Box w="100%">
                <FormLabel>Cargo</FormLabel>
                <RadioGroup 
                  defaultValue="Barbeiro"
                  value={ cargo }
                  onChange={ (value) => setCargo(value) }
                >
                  <HStack 
                    flexWrap="wrap"
                    spacing="14px"
                  >
                    <Radio value="Barbeiro">Barbeiro</Radio>
                    <Radio value="Manicure">Manicure</Radio>
                    <Radio value="Cabeleireiro(a)">{ 'Cabeleireiro(a)' }</Radio>
                  </HStack>
                </RadioGroup>
              </Box>
            </HStack>

            <HStack justify="center">
              <Flex justify="space-between">
                <Button
                  w={{ base: 150, md: 240 }}
                  p="6"
                  type="submit"
                  bg="black"
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ registerNewUser }
                >
                  Cadastrar
                </Button>

                <Button
                  w={{ base: 150, md: 240 }}
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
                  onClick={ handleLogin }
                >
                  Entrar
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

export default Cadastro;
