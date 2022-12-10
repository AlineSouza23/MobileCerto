import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
import { StackNavigationProp } from "@react-navigation/stack";
import { api } from "../../utils/api";
import { TextInputMask } from "react-native-masked-text";


type authScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Digito: undefined;
    Main: undefined;
    };


export default function Cadastro({route}:{
  route: any;
  navigation: any;
}): JSX.Element
{

  const navigation = useNavigation<authScreenProp>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');
  const [visible, setVisible] = useState(false);


 

  const handleSignIn= async () => {
    if (!validade()) return;
    setVisible(true);

    
    

    await api.post("api/clientes", {nome, email,identificador,senha})

    .then(() => {
      {/*loading */}
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      Alert.alert("", "Usuário cadastrado com sucesso")
      navigation.navigate('Login',)

    },5000);
    }).catch((err) =>{

     if(err) {
      Alert.alert("", "E-mail já existente, tente outro")
     }else{
      Alert.alert("", "Usuário cadastrado com sucesso")

     }
    });
  }
    const validade = () => {
      if (!nome){
        Alert.alert("Erro:", "Preencha o campo nome")
        return false;
      }
      if (!email){
        Alert.alert("Erro:", "Preencha o campo email")
        return false;
      }
      if (!senha){
        Alert.alert("Erro:", "Preencha o campo senha")
        return false;
      }
      if (!identificador){
        Alert.alert("Erro:", "Preencha o campo CPF/NIF")
        return false;
      }
      
      return true;
    }

  return (

    <View >

      <ImageBackground source={require('../../../assets/cad.png')} style={{ width: 450, height: 880, marginTop: -20 }} />
      <TextInputMask placeholder='Seu CPF ou NIF' maxLength={14} type={'cpf'} style={styles.textInput} onChangeText={setIdentificador}   value={identificador}/>
      <TextInput placeholder='Sua senha' style={styles.textInput} onChangeText={setSenha} value={senha} secureTextEntry={true} />
      <TextInput placeholder='Seu e-mail' style={styles.textInput} onChangeText={setEmail} value={email}  />
      <TextInput placeholder='Seu nome' style={styles.textInput} onChangeText={setNome} value={nome}  />


      <ImageBackground source={require('../../../assets/Sorriso.png')} style={{ width: 80, height: 80, marginTop: -385, marginLeft: 10 }} />
      <TouchableOpacity onPress={handleSignIn}>
       {/*Spinner para o carregamento da tela */}
        <Loading visible={visible}/>
        <Text style={styles.botao}>Cadastre-se</Text>
      </TouchableOpacity>
      <ImageBackground source={require('../../../assets/Sorriso.png')} style={{ width: 80, height: 80, marginTop: -450, marginLeft: 10 }} />

 
    </View>

  );
}




const styles = StyleSheet.create({
  container: {
  },
  textInput:{
    width:'80%',
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
    marginBottom:200,
    marginTop: -350,
    paddingLeft:20,
    shadowColor: '#171717',
    shadowOffset: {width: -9, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#fff",
    marginLeft: 25,
  },
  Text: {
    color: "#000",
    marginLeft: 30,
  },
  botao: {
    width: 150,
    color: "#000",
    display: 'flex',
    fontSize: 25,
    position: 'absolute',
    top: 390,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
    alignSelf: 'center',
  },
  

});
