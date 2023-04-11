import React, { createContext } from 'react';

interface IAuthContext {
  isLoggedIn: boolean | string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default AuthContext;
