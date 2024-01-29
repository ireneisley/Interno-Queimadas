import { Box, Center, Image, Flex, FormControl, HStack, FormLabel, Input, Button, RadioGroup, Radio, CheckboxGroup, VStack } from '@chakra-ui/react';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { agendarService } from '../services/agendarService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from '../utils/Toastify';
import { funcionarioCargoService } from '../services/funcionarioService';
import { listagemServicoService } from '../services/servicoService';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import UserContext from '../context/UserContext';
import InputMask from 'react-input-mask';

const Agendar = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [celular, setCelular] = useState('');
  const [dataMarcacao, setDataMarcacao] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaTermino, setHoraTermino] = useState('');
  const [cargo, setCargo] = useState('')
  const [barbeiroNome, setbarbeiroNome] = useState('');
  const [clienteNome, setclienteNome] = useState('');
  const [servicoNome, setServicoNome] = useState([])
  const [barbeirosOptions, setBarbeirosOptions] = useState([]);
  const [servicosOptions, setServicosOptions] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectChange = (selectedOptions) => {

    let response = [];

    for(let opt of selectedOptions){
      response.push(opt.value);
    }
    setServicoNome(response);
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
        const messageError = error.response.data.mensagem;

        showToastError(messageError)

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
        const messageError = error.response.data.mensagem;

        showToastError(messageError)

        console.error(error);
      }
    };

    fetchServicosOptions();
  }, []);

  const createNewScheduling = async () => {
    try {
      const response = await agendarService({
        celular_cliente: celular, 
        nome_barbeiro: barbeiroNome,  
        servicos: servicoNome,
        data_marcacao: formatarDataBrasileira(dataMarcacao), 
        hora_inicio: horaInicial,
        hora_termino: horaTermino
      });

      if (response) {
        showToastSuccess("Agendamento criado com sucesso")
      }

    } catch (e) {
      const messageError = e.response.data.mensagem;

      showToastError(messageError) //! Toastify disparando um alerta de erro

      console.log(e);
    }
  }

  const handleCadastroCliente = () => {
    history.push('/cadastro-cliente')
  }

  const handleAdmin = () => {
    history.push('/administrador')
  }

  if (!user || user.cargo.toLowerCase() !== 'administrador') {
    history.push('/')
  }

  const formatarDataBrasileira = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Box h="100vh" position="relative">
      {/* Imagem para telas grandes */}
      <Image
        src="/phio.jpeg"
        alt="Logo"
        h={{ base: 20, md: 32 }}
        maxW="100%"
        position="absolute"
        top={3}
        right={6}
        zIndex={1}
      />

      <Button
        w={{ base: 70, md: 0 }}
        p="4"
        type="button"
        bg="#52B587"
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
        bg="#52B587"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        {/* Título para telas grandes */}
        Agendar
      </Center>

      <Flex 
        align="center" 
        justify="center" 
        bg="blackAlpha.200" 
        h="calc(100vh - 150px)"
      >
        <Center
          w="100%"
          maxW={{ base: '100%', lg: '840px' }}
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
                      <FormLabel htmlFor="telefone" fontWeight="bold" fontSize="xl">Telefone</FormLabel>
                      {/* <Input 
                        id="cel" 
                        type="text"
                        placeholder="Digite o telefone do cliente"
                        value={ celular }
                        onChange={ ({ target: { value } }) => setCelular(value) } 
                      /> */}

                      <InputMask
                        mask="(99) 99999-9999"
                        maskChar="_"
                        value={ celular }
                        onChange={({ target: { value } }) => setCelular(value)}
                      >
                        {(inputProps) => <Input {...inputProps} id="cel" placeholder="Digite seu Celular" />}
                      </InputMask>
                    </Box>

                    <Box w="100%">
                      <FormLabel htmlFor="startTime" fontWeight="bold" fontSize="xl">Hora de Início</FormLabel>
                      <Input 
                        type="time"
                        value={ horaInicial }
                        onChange={ ({ target: { value } }) => setHoraInicial(value) } 
                      />
                    </Box>

                    <Box w="100%">
                      <FormLabel htmlFor="endTime" fontWeight="bold" fontSize="xl">Hora de Término</FormLabel>
                      <Input 
                        type="time"
                        value={ horaTermino }
                        onChange={ ({ target: { value } }) => setHoraTermino(value) } 
                      />
                    </Box>

                    <Box w="100%" >
                      <FormLabel htmlFor="nasc" fontWeight="bold" fontSize="xl">AGENDAR</FormLabel>
                      <Input 
                        id="nasc" 
                        type="date"
                        value={ dataMarcacao }
                        onChange={ ({ target: { value } }) => setDataMarcacao(value) } 
                      />
                    </Box>

                  </VStack>
                </CheckboxGroup>
              </Box>
            </HStack>

            <HStack justify="center">
              <Flex justify="space-between">
                <Button
                  w={240}
                  p="6"
                  type="submit"
                  bg="#52B587" //botão verde
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ createNewScheduling }
                >
                  Agendar
                </Button>
              </Flex>
            </HStack>

            <HStack justify="center">
              <Flex justify="space-between">
                <Button
                  w={240}
                  p="6"
                  type="submit"
                  bg="#52B587" //botão verde
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  onClick={ handleCadastroCliente }
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                >
                  Cadastrar Cliente
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

export default Agendar;
