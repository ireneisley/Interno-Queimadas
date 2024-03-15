import { useContext, useState } from "react";
import { VStack, Box, Text, Input, Button, Center, Flex, Image, Divider } from "@chakra-ui/react";
import { listagemComandasDataService, faturamentoMesService, faturamentoSemanalService} from '../services/comandaService';
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../context/UserContext";
// import { showToastError } from "../utils/Toastify";

const Financeiro = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [comandasDataPreco, setComandasDataPreco] = useState(null);
  const [faturamentoMes, setFaturamentoMes] = useState(null);
  const [faturamentoSemana, setFaturamentoSemana] = useState(null);
  const [Data, setData] = useState("");

  const formatarDataBrasileira = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarMesAno = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${mes}/${ano}`;
  };
  
  const faturamentoPorData = async () => {
    try {
      const dataFormatada = formatarDataBrasileira(Data);
      const response = await listagemComandasDataService(dataFormatada);
      const response2 =  await faturamentoMesService(dataFormatada);
      const response3 = await faturamentoSemanalService(dataFormatada);
      const comandas_resposta = response.data[0];
      const faturamento1 = response2.data[0];
      const faturamento2 = response3.data[0];
      setComandasDataPreco(comandas_resposta);
      setFaturamentoMes(faturamento1);
      setFaturamentoSemana(faturamento2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdmin = () => {
    history.push('/administrador')
  }


  
  return (
    <Box h="100vh" position="relative">
      {/* Logo */}
      <Image 
        src="/queimadastour.png" 
        alt="Logo" 
        h={{ base: 20, md: 32 }} 
        position="absolute" 
        top={3} 
        right={6}
        zIndex={1} 
      />

      {/* Título para telas grandes */}
      <Button
        w={{ base: 70, md: 0 }}
        p="4"
        type="button"
        bg="#E68854"
        color="white"
        _hover={{ bg: "blue.500" }}
        position="absolute"
        top={7}
        left={10}
        onClick={ handleAdmin }
      >
        <ArrowLeftIcon />
      </Button>

      <Center
        as="header"
        h={130}
        bg="#E68854"
        color="white"
        fontWeight="bold"
        fontSize={{ base: 'xl', md: '4xl' }}
        pb="8"
      >
        Financeiro
      </Center>

      {/* Conteúdo central responsivo */}
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
          position="relative"  // Alteração aqui para tornar o conteúdo relativo
          borderRadius={5}
          p="6"
          boxShadow="0 1px 2px #ccc"
          mt={{ base: 50, md: 0 }}
        >
          <VStack spacing="4">
            <Box>
              <Text fontWeight="bold">Data:</Text>
              <Input type="date" value={Data} onChange={(e) => setData(e.target.value)} />
            </Box>

            {comandasDataPreco && (
              <Box>
                <Divider my={2} />

                <Text fontWeight="bold">Faturamento para o dia {formatarDataBrasileira(Data)}:</Text>
                <Text>Total: {comandasDataPreco.total_precos}</Text>
                <Text>Total das Comissões: {comandasDataPreco.total_comissao}</Text>
                <Text>Total da Barbearia: {comandasDataPreco.total_barberia}</Text>

                <Divider my={2} />

                <Text fontWeight="bold">Faturamento para o mês {formatarMesAno(Data)}:</Text>
                <Text>Total: {faturamentoMes.total_precos}</Text>
                <Text>Total das Comissões: {faturamentoMes.total_comissao}</Text>
                <Text>Total da Barbearia: {faturamentoMes.total_barberia}</Text>

                <Divider my={2} />

                <Text fontWeight="bold">Faturamento para semana {faturamentoSemana.semana} do mês {formatarMesAno(Data)}:</Text>
                <Text>Total: {faturamentoSemana.total_precos}</Text>
                <Text>Total das Comissões: {faturamentoSemana.total_comissao}</Text>
                <Text>Total da Barberia: {faturamentoSemana.total_barberia}</Text>

                <Divider my={2} />
              </Box>
            )}

            <Button
              _hover={{ 
                bg: "green.500",
                color: "white"
              }}
              onClick={() => faturamentoPorData()}
            >
              Obter Faturamento
            </Button>
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
};

export default Financeiro;