import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';



interface HeaderProps{
  selectedTable: string;
  onCancelOrder: () => void;
}


export function Header({selectedTable, onCancelOrder}: HeaderProps){
  return(
    
      <Container>
          {/*fazer o texto desaparecer somente quando as informações forem preenchidas */}
         {!selectedTable && (
          <>
           <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
          <Text size={24} weight="700">CantinaGomes
          <Text size={24}>APP</Text>
          </Text>
          </>
         )}

         {selectedTable && (
          <>
           <Content>

<OrderHeader>
<Text size={24} weight='600'>Olá {selectedTable}👋...</Text>
<TouchableOpacity onPress={onCancelOrder}>
  <Text color='#D73035' weight='600' size={14}>Cancelar pedido</Text>
</TouchableOpacity>
</OrderHeader>

<Table>
<Text color='#666'>{selectedTable} se veio matar sua fome, está no APP certo! Faça a sua reserva a baixo ou cancele seu pedido.</Text>
</Table>
</Content>
          </>
         )}
      </Container>
      
  );
}