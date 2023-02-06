import { StyleSheet } from 'react-native';
import { NativeBaseProvider, StatusBar } from "native-base";
import { theme } from './src/style/theme';
import {Roboto_400Regular,Roboto_500Medium,Roboto_700Bold, useFonts} from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';
import { New } from './src/screens/New';
import { Find } from './src/screens/Find';
import { Pools } from './src/screens/Pools';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({Roboto_400Regular,Roboto_500Medium,Roboto_700Bold})
  

  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {
          fontsLoaded ? 
            <Routes />
          :
            <Loading /> 
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 