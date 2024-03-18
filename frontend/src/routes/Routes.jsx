// routes.js (ou onde quer que você defina suas rotas)

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Barbeiros from '../pages/Barbeiros';
import Agendar from '../pages/Agendar';
import Comanda from '../pages/Comanda';
import Financeiro from '../pages/Financeiro';
import GestaoUsuarios from '../pages/GestaoUsuarios';
import Agendamentos from '../pages/Agendamentos';
import EditarAgendamento from '../pages/EditarAgendamento';
import AgendamentosBarbeiros from '../pages/AgendamentosBarbeiros';
import EditarUsuario from '../pages/EditarUsuario';
import Manicure from '../pages/Manicure';
import Cabeleireiro from '../pages/Cabeleireiro';
import GestaoComandas from '../pages/GestaoComandas';
import EditarComandas from '../pages/EditarComandas';
import CadastroFuncionario from '../pages/CadastroFuncionario';
import Mapas from '../pages/Mapas';
import Mapas2 from '../pages/Mapas2';
import Mapas3 from '../pages/Mapas3';
import Mapas4 from '../pages/Mapas4';
import Mapas5 from '../pages/Mapas5';
import Mapas6 from '../pages/Mapas6';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/administrador" component={Admin} />
      <Route exact path="/barbeiro" component={Barbeiros} />
      <Route exact path="/manicure" component={Manicure} />
      <Route exact path="/cabeleireiro" component={Cabeleireiro} />
      <Route exact path="/cadastro-funcionario" component={CadastroFuncionario} />
      <Route exact path="/" component={Agendar} />
      <Route exact path="/comanda" component={Comanda} />
      <Route exact path="/financeiro" component={Financeiro} />
      <Route exact path="/gestao-usuarios" component={GestaoUsuarios} />
      <Route exact path="/agendamentos" component={Agendamentos} />
      <Route exact path="/agendamentos-funcionarios/:id" component={AgendamentosBarbeiros} />
      <Route exact path="/gestao-comandas" component={GestaoComandas} />
      <Route exact path="/editar-agendamento/:id" component={EditarAgendamento} />
      <Route exact path="/editar-usuarios/:id" component={EditarUsuario} />
      <Route exact path="/editar-comandas/:id" component={EditarComandas} />
      <Route exact path="/mapas" component={Mapas} /> 
      <Route exact path="/mapas2" component={Mapas2} /> 
      <Route exact path="/mapas3" component={Mapas3} /> 
      <Route exact path="/mapas4" component={Mapas4} /> 
      <Route exact path="/mapas5" component={Mapas5} />
      <Route exact path="/mapas6" component={Mapas6} />
    </Switch>
  )
}

export default Routes;
