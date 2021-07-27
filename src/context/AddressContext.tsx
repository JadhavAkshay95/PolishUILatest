import React, { ReactElement, useContext, useState } from 'react';


interface IAddressContext {
    isAddressAvailable: string;
    setIsAddressAvailable: any;
}
export const AddressContext = React.createContext<IAddressContext | null>(null);

export const AddressContextProvider = ({
    children
}: any) => {
    const [isAddressAvailable, setIsAddressAvailable] = useState("");

    return (
        <AddressContext.Provider
            value={{
                isAddressAvailable,
                setIsAddressAvailable,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
};

;