import React, { useState, createContext, useContext } from 'react';

const TykloKeyContext = createContext('');
const TykloKeyUpdateContext = createContext((key: string) => {});

export function useTykloKey() {
  return useContext(TykloKeyContext);
}

export function useUpdateTykloKey() {
  return useContext(TykloKeyUpdateContext);
}
// eslint-disable-next-line react/prop-types
const TykloKeyContextProvider: React.FC = ({ children }) => {
  const [mneumonicKey, setMneumonicKey] = useState('');
  const handleKeyUpdate = (key: string) => {
    console.log('Key received: ', key);
    setMneumonicKey(key);
  };
  console.log('Value of mneumonic key set to: ', mneumonicKey);
  return (
    <TykloKeyContext.Provider value={mneumonicKey}>
      <TykloKeyUpdateContext.Provider value={handleKeyUpdate}>
        {children}
      </TykloKeyUpdateContext.Provider>
    </TykloKeyContext.Provider>
  );
};

export default TykloKeyContextProvider;
