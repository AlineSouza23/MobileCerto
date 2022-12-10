import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Linking,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Cadastro/Loading";
import { StackNavigationProp } from "@react-navigation/stack";
import { api } from "../../utils/api";
import { Text } from "../Text";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


type authScreenProp = StackNavigationProp<RootStackParamList, "Main">;

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Digito: undefined;
  Main: undefined;
  Escolher: undefined;
  EsqueciSenha: undefined;
  Senha: undefined;
  Email: undefined;
  Perfil: undefined;
};

export interface token {
  id_cliente : string | any
}

export default function Login() {
  const navigation = useNavigation<authScreenProp>();
  const [user, setUser] = useState(null);
  const [cliente, setCliente] = useState()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [visible, setVisible] = useState(false);
  const [idCliente, setIdCliente] = useState("");
  const [newPassword, setNewPassword] = useState(false);

  var jwtDecode = require('jwt-decode')
  var usuario
  const [token, setToken] = useState();

  const login = async () => {
    if (!validade()) return;
    setVisible(true);

    await api
      .post("api/clientes/loginCliente", { email, senha })

      .then((response) => {
        setVisible(true);
        setIdCliente(response.data.idCliente);
        setEmail(email);
        setVisible(true);

        setNewPassword(true);
        setVisible(true);

        setTimeout(() => {
          setVisible(false);
          console.log(response.data);
          AsyncStorage.setItem("@token", (response.data.token));
          setVisible(true);
          setToken(response.data.token)
          var object : token = jwtDecode(response.data.token)
          console.log(object)
          AsyncStorage.setItem("@user", JSON.stringify(object.id_cliente))
          Alert.alert("", "Usuário logado com sucesso");
        }, 5000);
      })
      .catch((err) => {
        setVisible(false);

        if (err) {
          Alert.alert("Erro", "Email ou senha inválido");
        } else {
          Alert.alert("", "erro, usuário não encontrado");
          setVisible(false);
        }
      });
  };


   {/* useEffect(() => {
      api.get("api/clientes/buscarEmail" +email)
      .then((response) => setCliente(response.data))
      },[])
 */}
      
    
  const validade = () => {
    if (!email) {
      Alert.alert("Erro:", "Preencha o campo e-mail");
      return false;
    }
    if (!senha) {
      Alert.alert("Erro:", "Preencha o campo senha");
      return false;
    }
    return true;
  };

  

  {
    /*bloquear acesso a página restrita */
  }



  {
    /*const [avatar, setAvatar] = useState();

  async function imagePickerCall() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  } */
  }


  return (
    <View style={styles.container}>
      {newPassword ? (
        <>
          {/* <Image
        source={{
          uri: avatar
            ? avatar.uri
            :  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmyloview.com.br%2Fposter-user-icon-vector-people-icon-profile-vector-icon-person-illustration-no-D4BC2D9&psig=AOvVaw2wQMUGl2I6Tb-wRp5Fkh1G&ust=1670587564650000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLC55OT96fsCFQAAAAAdAAAAABAE"
        }}
        style={styles.avatar}
      />
     
 */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Escolher imagem</Text>
          </TouchableOpacity>

          <Text style={styles.PerfilEmail} size={24} weight="700">
            Email: {email}{" "}
          </Text>
          <Text style={styles.PerfilEmail} size={24} weight="700">
            {token}{" "}
          </Text>

          <ImageBackground
            source={require("../../../assets/guia.png")}
            style={{ width: 465, height: 500, marginTop: 300, left: -16 }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Main" as never, {email:email} as never)}>
            <Text style={styles.botaooo}>Cardápio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL("https://wa.me/5511970261589")}
          >
            <Text style={styles.botao222}>WhatsApp</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <ImageBackground
            source={require("../../../assets/Login.png")}
            style={{ width: 450, height: 880, marginTop: -19 }}
          />

          <TextInput
            placeholder="Sua senha..."
            style={styles.textInput}
            onChangeText={setSenha}
            value={senha}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Seu email"
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
          />

          <TouchableOpacity onPress={() => navigation.navigate("Email")}>
            <Text style={styles.botao2}>         Esqueci minha senha</Text>
          </TouchableOpacity>
          <ImageBackground
            source={require("../../../assets/Sorriso.png")}
            style={{ width: 80, height: 80, marginTop: -600, marginLeft: 10 }}
          />

          <TouchableOpacity onPress={login}>
            {/*Spinner para o carregamento da tela */}
            <Loading visible={visible} />
            <Text style={styles.botao}>Logar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 220,
    marginLeft: 155,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: "#FF8533",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 125,
  },
  buttonText: {
    color: "#fff",
  },
  textInput: {
    width: "80%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 200,
    marginTop: -345,
    paddingLeft: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -9, height: 4 },
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
    width: 130,
    height: 50,
    color: "#000",
    display: "flex",
    fontSize: 25,
    padding: 5,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "#fff",
    textAlign: "center",
    alignSelf: "center",
    top: -420,
    marginTop: 905,
  },
  botao2: {
    width: 400,
    color: "#000",
    display: "flex",
    fontSize: 15,
    position: "absolute",
    top: -100,
    padding: 0,

    marginLeft: 110,
    borderRadius: 50,
    alignSelf: "center",
  },
  errorMessage: {
    fontSize: 12,

    color: "red",

    fontWeight: "bold",

    paddingLeft: 20,
  },
  botao3: {
    width: 240,
    height: 53,
    color: "#000",
    display: "flex",
    fontSize: 25,
    padding: 8,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "#fff",
    textAlign: "center",
    alignSelf: "center",
    top: -1290,
    left: 90,
    marginTop: 905,
  },
  Perfil: {
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    width: 240,
    height: 53,
    display: "flex",
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
    left: 185,
    marginTop: 100,
  },
  PerfilBola: {
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    width: 100,
    height: 100,
    display: "flex",
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
    left: 165,
    marginTop: 200,
    borderWidth: 1,
    borderRadius: 50,
  },
  PerfilEmail: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    width: 240,
    height: 53,
    display: "flex",
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
    left: 100,
    marginTop: 300,
  },

  foto: {
    width: 110,
    height: 110,
    color: "#000",
    display: "flex",
    fontSize: 25,
    padding: 8,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "#d3d3d3",
    textAlign: "center",
    alignSelf: "center",
    top: -1800,
    left: 160,
    marginTop: 905,
  },
  nome: {
    backgroundColor: "#d3d3d3",
    padding: 5,
    width: 250,
    borderRadius: 50,
    marginLeft: 90,
    display: "flex",
    marginTop: -750,
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },

  fundo: {
    backgroundColor: "#fff",
    padding: 5,
    width: 250,
    height: 200,
    borderRadius: 50,
    marginLeft: 90,
    display: "flex",
    marginTop: -420,
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },

  icons: {
    width: 20,
    height: 20,
    backgroundColor: "#d3d3d3",
    marginLeft: 110,
    position: "absolute",
    marginTop: 53,
    padding: 2,
    alignItems: "center",
    color: "red",
  },

  compra: {
    width: 20,
    height: 20,
    backgroundColor: "#d3d3d3",
    marginLeft: 180,
    position: "absolute",
    marginTop: 53,
    padding: 2,
    alignItems: "center",
  },
  perfil: {
    width: 20,
    height: 20,
    backgroundColor: "#d3d3d3",
    marginLeft: 250,
    position: "absolute",
    marginTop: 53,
    padding: 2,
    alignItems: "center",
    color: "red",
  },

  botaooo: {
    width: 240,
    height: 53,
    color: "#000",
    display: "flex",
    fontSize: 25,
    padding: 8,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "#fff",
    textAlign: "center",
    alignSelf: "center",
    top: -1290,
    left: 90,
    marginTop: 905,
  },

  botao222: {
    width: 240,
    height: 53,
    color: "#000",
    display: "flex",
    fontSize: 25,
    padding: 8,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "#fff",
    textAlign: "center",
    alignSelf: "center",
    top: -1200,
    left: 90,
    marginTop: 905,
  },
});
