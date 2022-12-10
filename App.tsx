import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import PrimeiraTela from './src/components/PrimeiraTela/index';
import Login from './src/components/Login/index';
import EsqueciSenha from './src/components/EsqueciSenha/index'
import Cadastro from './src/components/Cadastro';
import { createStackNavigator } from '@react-navigation/stack';
import { Categories } from './src/components/Categories';
import Escolher from './src/components/Escolher';
import Main from './src/Main';
import { Perfil } from './src/components/Perfil';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Email from './src/components/EsqueciSenha/index';
import Digito from './src/components/EsqueciSenha/digito';
import Senha from './src/components/EsqueciSenha/senha';


const Stack = createStackNavigator<RootStackParamList>();


export type RootStackParamList = {
PrimeiraTela: undefined;
Login: undefined;
Cadastro: undefined;
Main: undefined;
Categories: undefined;
Escolher: undefined;
EsqueciSenha: undefined;
Perfil: undefined;
Digito: undefined;
Email: undefined;
Senha: undefined;
}

  
  const App: React.FC<RootStackParamList> = () => {
    const [isFontsLoaded] = useFonts({
      'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
      'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
      'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
    });
  
  /* se as fontes ainda não foram carregadas retornar nullo para não renderizar */
    if(!isFontsLoaded) {
      return null;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="PrimeiraTela" component={PrimeiraTela}options={{headerShown: false}}/>

        <Stack.Screen name="Main" component={Main} options={{headerShown: false }}/>


        <Stack.Screen name="Login" component={Login}/>


        <Stack.Screen name="Escolher" component={Escolher} options={{headerShown: false, title: 'Perfil'}}/>
          <Stack.Screen name="Cadastro" component={Cadastro}/>
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="Digito" component={Digito} />
          <Stack.Screen name="Senha" component={Senha} />




        </Stack.Navigator>
        
      </NavigationContainer>
    );
  };
  
  export default App;


