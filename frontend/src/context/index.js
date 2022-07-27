import { createContext, useState } from 'react';

export const DadosContext = createContext()

export default function DadosContextProvider(props) {

    const [qrCodeScanned, setQRCodeScanned] = useState(false)
    return (
        <DadosContext.Provider
            value={{
                qrCodeScanned,
                setQRCodeScanned
            }}
        >
            {props.children}
        </DadosContext.Provider>
    );
}