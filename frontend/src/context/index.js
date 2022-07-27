import { createContext, useState } from 'react';

export const DadosContext = createContext()

export default function DadosContextProvider(props) {
<<<<<<< Updated upstream

    const [qrCodeScanned, setQRCodeScanned] = useState(false)
    return (
        <DadosContext.Provider
            value={{
                qrCodeScanned,
                setQRCodeScanned
=======
    const [dados, setDados] = useState({})
    return (
        <DadosContext.Provider
            value={{
                dados,
                setDados
>>>>>>> Stashed changes
            }}
        >
            {props.children}
        </DadosContext.Provider>
    );
}