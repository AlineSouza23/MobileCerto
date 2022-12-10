import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage"

{/*bloquear acesso a página restrita */}
export const getValToken = async ( ) => {
    const valueToken = await AsyncStorage.getItem('@token');
    if(valueToken !==null){
        return valueToken;
    }else{
        return null;
    }
}

