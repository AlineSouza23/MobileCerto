import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, {useState} from 'react';
import Loading from '../Cadastro/Loading';
import { api } from '../../utils/api';


export default function Senha({navigation}: {
  navigation: any;
}): JSX.Element
 {
  
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);


  const emailB = async () => {
   
  await api.post("api/clientes/buscarEmail", {email})
  .then(( ) => {
    
    setEmail(email);
    Alert.alert("E-mail correto", "Verifique sua caixa de e-mail!");
    setVisible(false);
    navigation.navigate('Digito', {em: email})

    setTimeout(() => {
  },5000);
  }).catch((err) =>{
    if(err){
      setVisible(false);
  Alert.alert("", "E-mail não existe no banco!")

   }else{
    setVisible(false);
     Alert.alert("", "erro, usuário não encontrado")

   }

  });

 }

 const validade = () => {
  if (!email){
    Alert.alert("Erro:", "Preencha o campo e-mail")
    return false;
  }
  return true;
}
  
  return (
    <View>
      <StatusBar hidden/>
      <ImageBackground source={require('../../../assets/cantina.png')}  style={{width: 370,height: 430, marginTop: -89, left:150}}/>
      <ImageBackground source={require('../../../assets/Sorriso.png')}  style={{width: 80,height: 80, marginTop: -299, marginLeft: 20}}/>
     
      <TouchableOpacity onPress={emailB}>
        {/*Spinner para o carregamento da tela */}
        <Loading visible={visible}/>
        <Text style={styles.botao}>Enviar</Text>
      </TouchableOpacity>

      <TextInput placeholder='Seu e-mail...' style={styles.textInput} onChangeText={text=>setEmail(text)} />

      <ImageBackground source={require('../../../assets/cantina2.png')}  style={{width: 370,height: 400, marginTop: 250, left:-70}} />

      <Text style={{marginTop: -700, marginLeft: 45, fontSize:24}}>Insira seus dados  {'\n'} cadastrados</Text>
    </View>



  );    
  }
const styles = StyleSheet.create({
  container: {
      
  },
  TouchableOpacity:{
    top: 161
  },
  Text:{
    color: "#000",
  },
  botao:{
    width:130,
    height: 50,
    color:"#000", 
    display:'flex',
    fontSize:25,
    padding: 5,
    borderRadius:50,
    position:'absolute',
    backgroundColor: "#fff",
    textAlign: 'center',
    alignSelf:'center',
    top:-550,
    marginTop: 905
  },
  textInput:{
    width:'80%',
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
    marginBottom:-165,
    marginTop: 250,
    paddingLeft:20,
    backgroundColor:'#fff',
    shadowColor: '#171717',
    shadowOffset: {width: -9, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderStartWidth: 3,
    marginLeft: 25,
  }
});
