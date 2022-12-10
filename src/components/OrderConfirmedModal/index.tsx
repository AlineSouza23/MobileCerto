import { StatusBar } from 'expo-status-bar';
import { Modal, View } from 'react-native';

import { Text } from '../Text';
import { Container, OkButton } from './styles';

type OrderConfirmedModalProps = {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({visible, onOk}: OrderConfirmedModalProps) {
  return (
    <View> 
    <Modal visible={visible} animationType='fade'>

      <StatusBar style='light' backgroundColor='#FF8533'/>

      <Container>
        <Text color='#ffff' size={20} weight='600' style={{marginTop: 12}}>Pedido confirmado</Text>
        <Text color='#ffff' size={16} opacity={0.9} style={{marginTop: 4}}>O pedido já entrou na fila de produção!</Text>

        <OkButton onPress={onOk}>
          <Text weight='600' color='#000000'>OK</Text>
        </OkButton>
      </Container>
    </Modal>
    </View>
  );
}
