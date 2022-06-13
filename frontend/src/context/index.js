import { createContext, useState } from 'react';

export const DadosContext = createContext()

export default function DadosContextProvider(props) {
    return (
        <DadosContext.Provider
            value={{
                
            }}
        >
            {props.children}
        </DadosContext.Provider>
    );
}