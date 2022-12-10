import { View, ImageBackground, Linking, TouchableOpacity, StyleSheet, Text, TextInput, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { getValToken } from "../Login/autenticacao"
import { StackNavigationProp } from '@react-navigation/stack';
import { Texto } from '../Menu/styles';



type authScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Digito: undefined;
    Main: undefined;
    Perfil: undefined;
  


    };

export default function Escolher() {
    const navigation = useNavigation<authScreenProp>();
  const [token, setToken] = useState();
  const route = useRoute();

{/*bloquear acesso a página restrita */}
 const getValToken = async ( ) => {
    const valueToken = await AsyncStorage.getItem('@token');
    if(valueToken !==null){
        return valueToken;
    }else{
        return null;
    }
}

  
  const getToken = async () => {

    const valToken = await AsyncStorage.getItem('@token');
    setToken(token);
    try {
      {/*resuperar token */ }
      const valToken = await getValToken();
      {/*setando o token */ }
      setToken(token);
      {/*verificar se usuário possui token */ }
      if (valToken == null) {
        Alert.alert("", "Erro, necessário realizar o login para acessar a página")
      }
    } catch (err) { }
  }
  useEffect(() => {
    getToken();
    getValToken();
  }, []);



  
  return (
    <View>

      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
      <Texto style={styles.Perfil}>Perfil </Texto>
      </TouchableOpacity>

      <Image style={styles.PerfilBola} source={{uri: `https://www.elektroagz.ch/.cm4all/uproc.php/0/Bilder%20Personal/.Person.jpg/picture-200?_=1701093e9b0`}} />

      <Texto style={styles.PerfilEmail}>Email: aline2308souza@gmail.com</Texto>
      {/*<Text>{token}</Text>*/}
      <ImageBackground source={require('../../../assets/guia.png')} style={{ width: 465, height: 500, marginTop: 500, left: -16 }} />
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text style={styles.botao}>Cardápio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/5511970261589')}>
        <Text style={styles.botao2}>WhatsApp</Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  botao: {
    width: 240,
    height: 53,
    color: "#000",
    display: 'flex',
    fontSize: 25,
    padding: 8,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: "#fff",
    textAlign: 'center',
    alignSelf: 'center',
    top: -1290,
    left: 90,
    marginTop: 905
  },
  Perfil:{
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    width: 240,
    height: 53,
    display: 'flex',
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    left: 185,
    marginTop: 100,

  },
  PerfilBola:{
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    width: 100,
    height: 100,
    display: 'flex',
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    left: 165,
    marginTop: 200,
    borderWidth: 1,
    borderRadius: 50,

  },
  PerfilEmail:{
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    width: 240,
    height: 53,
    display: 'flex',
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    left: 200,
    marginTop: 350,

  },


  botao2: {
    width: 240,
    height: 53,
    color: "#000",
    display: 'flex',
    fontSize: 25,
    padding: 8,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: "#fff",
    textAlign: 'center',
    alignSelf: 'center',
    top: -1200,
    left: 90,
    marginTop: 905,
  },

  foto: {
    width: 110,
    height: 110,
    color: "#000",
    display: 'flex',
    fontSize: 25,
    padding: 8,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: "#d3d3d3",
    textAlign: 'center',
    alignSelf: 'center',
    top: -1800,
    left: 160,
    marginTop: 905
  },
  nome: {
    backgroundColor: '#d3d3d3',
    padding: 5,
    width: 250,
    borderRadius: 50,
    marginLeft: 90,
    display: 'flex',
    marginTop: -750,
    shadowOpacity: 0.8,
    shadowRadius: 5
  },

  fundo: {
    backgroundColor: '#fff',
    padding: 5,
    width: 250,
    height: 200,
    borderRadius: 50,
    marginLeft: 90,
    display: 'flex',
    marginTop: -420,
    shadowOpacity: 0.8,
    shadowRadius: 5
  },

  icons: {
    width: 20,
    height: 20,
    backgroundColor: '#d3d3d3',
    marginLeft: 110,
    position: 'absolute',
    marginTop: 53,
    padding: 2,
    alignItems: 'center',
    color: 'red'
  },

  compra: {
    width: 20,
    height: 20,
    backgroundColor: '#d3d3d3',
    marginLeft: 180,
    position: 'absolute',
    marginTop: 53,
    padding: 2,
    alignItems: 'center',
  },
  perfil: {
    width: 20,
    height: 20,
    backgroundColor: '#d3d3d3',
    marginLeft: 250,
    position: 'absolute',
    marginTop: 53,
    padding: 2,
    alignItems: 'center',
    color: 'red'
  }
});