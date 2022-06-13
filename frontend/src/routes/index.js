import Drawer from './drawer'
import { NavigationContainer } from '@react-navigation/native';
import DadosContextProvider from '../context'

export default function Routes() {
  return (
    <DadosContextProvider>
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </DadosContextProvider>
  )

}