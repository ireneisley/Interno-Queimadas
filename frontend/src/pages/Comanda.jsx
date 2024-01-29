//Imports
import { VStack, Box, Center, FormControl, FormLabel, CheckboxGroup, Button, HStack, Image, Flex, Input, RadioGroup, Radio } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import Select from 'react-select'
import { comandaCadastroService } from "../services/comandaService";
import { funcionarioCargoService } from "../services/funcionarioService"
import { listagemServicoService } from "../services/servicoService"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../context/UserContext";

function Comanda() {
  const history = useHistory();

  const { user } = useContext(UserContext);

  //Consts
  const [barbeiroNome, setbarbeiroNome] = useState('');
  const [clienteNome, setclienteNome] = useState('');
  const [servicoNome, setservicoNome] = useState([])
  const [preco, setPreco] = useState('')
  const [barbeirosOptions, setBarbeirosOptions] = useState([]);
  const [servicosOptions, setServicosOptions] = useState([]);
  const [precosOptions, setPrecosOptions] = useState([]);
  const [barbeiroNomeValido, setbarbeiroNomeValido] = useState(false)
  const [clienteNomeValido, setclienteNomeValido] = useState(false);
  const [registerBtnDisabled, setRegisterBtnDisabled] = useState(true); //! Estado de habilitação do botão
  const [selectedServices, setSelectedServices] = useState([]);
  const [cargo, setCargo] = useState('')

  //------------------------------------------------------------- setando selects,serviço e cargo -------------------------------------------------------------------------
  const handleSelectChange = (selectedOptions) => {

    let response = [];

    for(let opt of selectedOptions){
      response.push(opt.value);
    }
    setservicoNome(response);
  };

  const handleSelectChangeBarbeiro = (selectedOptions) => {
    setbarbeiroNome(selectedOptions.value);
  };
  
  const handleServiceChange = (selectedServices) => {
    setSelectedServices(selectedServices);
  };

  const handleChangeCargo = (value) => {
    setCargo(value);
  };

  //----------------------------------------------------------------------- UseEffect------------------------------------------------------------------
  //Setando select
  useEffect(() => {
    const fetchBarbeirosOptions = async () => {
      try {
        const response = await funcionarioCargoService({cargo});
        const barbers = response.data.map(barber => ({
          value: barber.nome,
          label: barber.nome
        }));
        setBarbeirosOptions(barbers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBarbeirosOptions();
  }, [cargo]); 

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

  //Nome Barbeiro
  useEffect(() => {
    setbarbeiroNomeValido(false)

    const MIN_NAME_LENGTH = 3;

    if (barbeiroNome.length < MIN_NAME_LENGTH) return;

    setbarbeiroNomeValido(true)
  }, [barbeiroNome])

  //Nome Cliente
  useEffect(() => {
    setclienteNomeValido(false)

    const MIN_NAME_LENGTH = 3;

    if (clienteNome.length < MIN_NAME_LENGTH) return;

    setclienteNomeValido(true)
  }, [clienteNome])
  
  useEffect(() => {
    setRegisterBtnDisabled(true);

    if (!barbeiroNomeValido) return;
    if (!clienteNomeValido) return;
    if (!servicoNome) return;
    if (!preco) return;
    setRegisterBtnDisabled(false);
  }, [barbeiroNomeValido, clienteNomeValido, servicoNome, preco]);

  //------------------------------------------------------------------ Registro de Comandas -----------------------------------------------------

  const registerNewComanda = async () => {
    try {
      const response = await comandaCadastroService({
        barbeiroNome,
        clienteNome,
        servicoLista:servicoNome,
        preco
      });

      if (response) {
        showToastSuccess("Comanda cadastrada com sucesso")
      }

    } catch (e) {
      const messageError = e.response.data.mensagem;

      showToastError(messageError)
      console.log(e);
    }
  }

  const handleAdmin = () => {
    history.push('/administrador')
  }

  if (!user) {
    history.push('/')
  }

  //------------------------------------------------------------------ Retorno da Página -------------------------------------------------------------------------------------

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
        w={{ base: 70, md: 0 }}
        p="4"
        type="button"
        bg="gray.900"
        color="white"
        _hover={{ bg: "blue.500" }}
        position="absolute"
        top={8}
        left={10}
        zIndex={1}
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
        Comandas
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
            <HStack spacing="4">
              <Box w="100%">
                <FormLabel></FormLabel>
                <CheckboxGroup defaultValue={[]} onChange={ handleServiceChange }>
                  <VStack spacing="24px" alignItems="flex-start">
                    <Box w="100%">
                      <FormLabel htmlFor="nome" fontWeight="bold" fontSize="xl">Tipo Funcionário</FormLabel>
                      <RadioGroup 
                        defaultValue="Barbeiro"
                        value={ cargo }
                        onChange={ handleChangeCargo }
                      >
                      <HStack spacing="24px">
                        <Radio value="Barbeiro">Barbeiro</Radio>
                        <Radio value="Manicure">Manicure</Radio>
                        <Radio value="Cabeleireiro(a)">{ 'Cabeleireiro(a)' }</Radio>
                      </HStack>
                      </RadioGroup>
                    </Box>

                    <Box w="100%">
                      <FormLabel htmlFor="nome" fontWeight="bold" fontSize="xl">Funcionário</FormLabel>
                      <Select
                        options={ barbeirosOptions }
                        onChange={ handleSelectChangeBarbeiro }
                      />
                    </Box>

                    <Box w="100%">
                      <FormLabel htmlFor="nome" fontWeight="bold" fontSize="xl">Cliente</FormLabel>
                      <Input 
                        id="cliente"
                        placeholder="Digite o nome do cliente"
                        value = { clienteNome } 
                        onChange={ ({ target: { value } }) => setclienteNome(value) }
                      />
                    </Box>

                    <Box w="100%">
                      <FormLabel htmlFor="nome" fontWeight="bold" fontSize="xl">Serviços</FormLabel>
                      <Select options={ servicosOptions } 
                        isMulti
                        onChange={ handleSelectChange }/>
                    </Box>

                    <Box w="100%">
                      <FormLabel htmlFor="nome" fontWeight="bold" fontSize="xl">Preço</FormLabel>
                      <Input 
                        id="preco"
                        placeholder="Digite o preço do serviço"
                        value = { preco } 
                        onChange={ ({ target: { value } }) => setPreco(value) } 
                      />
                    </Box>
                  </VStack>
                </CheckboxGroup>
              </Box>
            </HStack>

            <HStack justify="center" mt="2"> 
              <Button
                w={{ base: 150, md: 240}}
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
                disabled = { registerBtnDisabled }
                onClick = { registerNewComanda }
              >
                Enviar
              </Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>

      <ToastContainer />
    </Box>
  );
}

export default Comanda;
