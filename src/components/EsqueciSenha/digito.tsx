import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet,ImageBackground, TouchableOpacity, Alert } from "react-native";
import { api } from "../../utils/api";



export default function Digito({route, navigation}:{
  route: any;
  navigation: any;
}): JSX.Element
{

  const [email, setEmail] = useState('')

  const [idCliente, setIdCliente] = useState('');
  const [newPassword, setNewPassword] = useState(false);
  const [senha, setSenha] = useState('');
  const [codigo, setCodigo] = useState('')

  
  
 

  const verifikey = async () => {
    if (!validade()) return;


         await api.post("api/clientes/verificarcod" +email, {codigo} )
         
         .then((response) => {
          setIdCliente(response.data.idCliente);
          setEmail(email);
          Alert.alert("Cantina Gomes", "Código e e-mail correto")
          navigation.navigate('Login')
        }).catch((err) => {
          if(err){
            Alert.alert("Cantina Gomes:", "Digite uma nova senha")
            setNewPassword(true);

          }else{  
            Alert.alert("Erro:", "Tente novamente mais tarde")
          }
        });
      }
        const validade = () => {
          if (!codigo){
            Alert.alert("Erro:", "Preencha o campo de verificação")
            return false;
          }
         
          return true;
        }


        
        const editPassword = async () => {
         
          console.log(idCliente)
         const headers = {
          'Content-Type': 'application/json',
         }
          await api.put("api/clientes/alterar/"+idCliente, {senha}, {headers} )
          .then((response) => {
            console.log(response);
            Alert.alert("Cantina Gomes:", "Senha alterada com sucesso")
            navigation.navigate('Login')

          }).catch((err) => {
            if(err){
              Alert.alert("Cantina Gomes:", "Senha alterada com sucesso!")
              navigation.navigate('Login')

            }else{  
              Alert.alert("Cantina Gomes:", "Tente novamente mais tarde")
            }
          });
        }
        const emailS = route.params?.em
        console.log(emailS)

  return(
    <View >
      
     <ImageBackground source={require('../../../assets/cantina.png')}  style={{width: 370,height: 430, marginTop: -89, left:150}}/>
     <ImageBackground source={require('../../../assets/Sorriso.png')}  style={{width: 80,height: 80, marginTop: -299, marginLeft: 20}}/>
   {newPassword ?   <>
        <TextInput placeholder='Digite uma nova senha' style={styles.textInput} onChangeText={text=>setSenha(text)} value={senha} secureTextEntry={true}/>

      <TouchableOpacity onPress={editPassword}>
        <Text style={styles.botaoSalvar}>Salvar</Text>
      </TouchableOpacity>


      <ImageBackground source={require('../../../assets/cantina2.png')}  style={{width: 370,height: 400, marginTop: 260, left:-70}}/>

      <Text style={{marginTop: -650, marginLeft: 45, fontSize:24}}>Nova Senha</Text>
      </> :
   
        <>
        <Text style={{marginTop: 200, marginLeft:30}}>{emailS}</Text>

      <TouchableOpacity onPress={verifikey}>
        <Text style={styles.botaov}>Verificar</Text>
      </TouchableOpacity>

      <TextInput placeholder='Digito de verificação' style={styles.textInputV} onChangeText={text=>setCodigo(text)} value={codigo}/>

      <ImageBackground source={require('../../../assets/cantina2.png')}  style={{width: 370,height: 400, marginTop: 260, left:-70}}/>

      <Text style={{marginTop: -750, marginLeft: 25, fontSize:24}}>Digite o número {'\n'}recebido em seu email</Text>
      </>
      }
   
    
    </View>
   
);
}

const styles = StyleSheet.create({
  container: {
    
  },
  TouchableOpacity:{
    top: 161
  },
  textInput:{
    width:'80%',
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
    marginBottom:-165,
    marginTop: 220,
    paddingLeft:20,
    shadowColor: '#171717',
    shadowOffset: {width: -9, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 25,
    backgroundColor: '#fff'
  },

  textInputV:{
    width:'80%',
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
    marginBottom:-165,
    marginTop: 90,
    paddingLeft:20,
    shadowColor: '#171717',
    shadowOffset: {width: -9, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 25,
    backgroundColor: '#fff'
  },
  Text:{
    color: "#000",
    marginLeft: 30,
  },
  botao:{
    width:159,
    height: 50,
    color:"#000", 
    display:'flex',
    fontSize:25,
    padding: 5,
    borderRadius:50,
    position:'absolute',
    backgroundColor:'#fff',
    textAlign: 'center',
    alignSelf:'center',
    top:-600,
    marginTop: 905, 
  },
  botaov:{
    width:159,
    height: 50,
    color:"#000", 
    display:'flex',
    fontSize:25,
    padding: 5,
    borderRadius:50,
    position:'absolute',
    backgroundColor:'#fff',
    textAlign: 'center',
    alignSelf:'center',
    top:-700,
    marginTop: 905, 
  },
  botaoSalvar:{
    width:159,
    height: 50,
    color:"#000", 
    display:'flex',
    fontSize:25,
    padding: 5,
    borderRadius:50,
    position:'absolute',
    backgroundColor:'#fff',
    textAlign: 'center',
    alignSelf:'center',
    top:-710,
    marginTop: 905, 
  }
});