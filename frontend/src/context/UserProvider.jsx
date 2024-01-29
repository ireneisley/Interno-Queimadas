import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  // Busca usuário no localstorage e salva no estado
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(savedUser);
  
  // Limpa o localstorage, o estado e redireciona o usuário para tela de login
  const logOut = () => {
    localStorage.clear();

    setUser(null);

    history.push('/');
  }

  const contextValue = React.useMemo(() => ({
    user,
    setUser,
    logOut
  }), [user]);

  return (
    <UserContext.Provider
      value={ contextValue }
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserProvider;
