import { Flex, Box, Center, FormControl, Input, FormLabel, HStack, Button, Image } from "@chakra-ui/react";
import { registerClienteService } from "../services/registerClienteService";
import { useContext, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../context/UserContext";
// import InputMask from 'react-input-mask';

function CadastroCliente() {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [celular, setCelular] = useState('');
  const [instagram, setInstagram] = useState('');
  const [naturalidade, setNaturalidade] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');

  const registerNewCustomer = async () => {
    try {
      const response = await registerClienteService({
        nome,
        email,
        cpf_cnpj: cpf,
        data_nascimento: dataNascimento,
        data_de_cadastro: dataCadastro,
        celular,
        instagram,
        naturalidade,
        cidade,
        endereco
      })

      if (response) {
        showToastSuccess("Cliente cadastrado com sucesso")
      }

    } catch (e) {
      const messageError = e.response.data.mensagem;

      showToastError(messageError) //! Toastify disparando um alerta de erro

      console.log(e)
    }
  }

  const handleAdmin = () => {
    history.push('/administrador')
  }

  if (!user || user.cargo.toLowerCase() !== 'administrador') {
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
        top={{ base: 4, md: 1 }}
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
        left={9}
        zIndex={2}
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
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        {/* Título para telas grandes */}
        Cadastrar Cliente
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
            gap="6" 
            maxW="600px" 
            mx="auto"
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
                  placeholder="Nome do Cliente"
                  value={nome}
                  onChange={({ target: { value } }) => setNome(value)}
                />
              </Box>

              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail do Cliente"
                  value={email}
                  onChange={({ target: { value } }) => setEmail(value)}
                />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="cpfCnpj">CPF/CNPJ</FormLabel>
                <Input 
                  id="email" 
                  type="text"
                  placeholder="Seu CPF ou CNPJ"
                  value={ cpf }
                  onChange={ ({ target: { value } }) => setCpf(value) } 
                />
                {/* <InputMask
                  mask="999.999.999-99"
                  maskChar="_"
                  value={cpf}
                  onChange={({ target: { value } }) => setCpf(value)}
                >
                  {(inputProps) => <Input {...inputProps} id="cpfC" placeholder="Seu CPF" />}
                </InputMask> */}
              </Box>
              {/* ... mais campos ... */}
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
                  value={dataNascimento}
                  onChange={({ target: { value } }) => setDataNascimento(value)}
                />
              </Box>

              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="nasc">Cliente Desde</FormLabel>
                <Input
                  id="nasc"
                  type="date"
                  value={dataCadastro}
                  onChange={({ target: { value } }) => setDataCadastro(value)}
                />
              </Box>
            </HStack>

            <HStack>
              <Box 
                w={{ base: "100%", md: "48%" }}
              >
                <FormLabel htmlFor="natural">Naturalidade</FormLabel>
                <Input
                  id="natural"
                  type="text"
                  placeholder="Cidade Natal do Cliente"
                  value={naturalidade}
                  onChange={({ target: { value } }) => setNaturalidade(value)}
                  mb={{ base: "4", md: "0" }} // Adiciona margem inferior apenas em dispositivos móveis
                />
              </Box>
            </HStack>

            <HStack 
              flexWrap="wrap" 
              spacing={{ base: "2", md: "4" }}
            >
              <Box w="100%">
                <FormLabel htmlFor="cel">Whatsapp</FormLabel>
                <Input 
                  id="cel" 
                  type="text"
                  placeholder="(99) 99999-9999"
                  mask="(99) 99999-9999"
                  value={ celular }
                  onChange={ ({ target: { value } }) => setCelular(value) } 
                />
                {/* <InputMask
                  mask="(99) 99999-9999"
                  maskChar="_"
                  value={celular}
                  onChange={({ target: { value } }) => setCelular(value)}
                >
                  {(inputProps) => <Input {...inputProps} id="cel" placeholder="Digite seu Celular" />}
                </InputMask> */}
              </Box>

              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="instagram">Instagram</FormLabel>
                <Input
                  id="instagram"
                  type="text"
                  placeholder="Instagram do Cliente"
                  value={instagram}
                  onChange={({ target: { value } }) => setInstagram(value)}
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
                  placeholder="Endereço do Cliente"
                  value={endereco}
                  onChange={({ target: { value } }) => setEndereco(value)}
                />
              </Box>

              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="cidade">Cidade</FormLabel>
                <Input
                  id="cidade"
                  type="text"
                  placeholder="Cidade onde o Cliente reside"
                  value={cidade}
                  onChange={({ target: { value } }) => setCidade(value)}
                />
              </Box>
            </HStack>

            <HStack justify="center" mt="4">
              <Button
                w={{ base: 120, md: 240 }}
                p="6"
                type="submit"
                bg="black"
                color="white"
                fontWeight="bold"
                fontSize="xl"
                _hover={{ bg: "gray.900" }}
                h="auto"
                onClick={registerNewCustomer}
              >
                Cadastrar
              </Button>
            </HStack>

          </FormControl>
        </Center>
      </Flex>

      <ToastContainer />
    </Box>
  );
}

export default CadastroCliente;
