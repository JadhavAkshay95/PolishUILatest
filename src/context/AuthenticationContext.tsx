import React, { ReactElement, useContext, useState } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: any;
}

const AuthenticationContext = React.createContext<IAuthContext | null>(null);

export const AuthenticationContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error('No Context Provider for AuthContext found');
  }

  return context;
};
