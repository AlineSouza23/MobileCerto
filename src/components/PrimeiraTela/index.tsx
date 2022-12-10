import React, {Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import Login from "../Login";
import Cadastro from "../Cadastro";
import { StackNavigationState, useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack"
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationStackProp} from "react-navigation-stack";

type authScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;


export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  };

 export default function PrimeiraTela(){
  const navigation = useNavigation<authScreenProp>();
        return(
            <View>

            <StatusBar hidden/>
      <ImageBackground source={require('../../../assets/cantina.png')}  style={{width: 370,height: 430, marginTop: -89, left:150}}/>
      <ImageBackground source={require('../../../assets/Sorriso.png')}  style={{width: 80,height: 80, marginTop: -289, marginLeft: 20}}/>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.botao}>Logar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.botao2}>Cadastrar</Text>
      </TouchableOpacity>
      <ImageBackground source={require('../../../assets/cantina2.png')}  style={{width: 370,height: 400, marginTop: 425, left:-70}} />
            </View>
        )
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
    botao2:{
      width:130,
      height: 50,
      color:"#000", 
      display:'flex',
      fontSize:25,
      padding: 5,
      backgroundColor: "#fff",
      borderRadius:50,
      position:'absolute',
      textAlign: 'center',
      alignSelf:'center',
      top:-650,
      marginTop: 905
    }
    
  });
