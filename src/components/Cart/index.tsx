import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import { Actions, Image, Item, ProductContainer, QuantityContainer, ProductDetails, Summary, TotalContainer } from './styles';

type CartProps = {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDrecement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
  //  route: any;
  //navigation: any;

}

export function Cart({ cartItems, onAdd, onDrecement, onConfirmOrder, selectedTable }: CartProps) {



  const [isModalVisble, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idCliente, setIdCliente] = useState('');

  // const email = route?.email

  {/* useEffect(() => {
    api.get("api/clientes/buscarEmail/" +email)
    .then((response) => setIdCliente(response.data.idCliente))
    }) */}

  const verifikey = async () => {

    await api.post("api/clientes/verificarcod")

      .then((response) => {
        setIdCliente(response.data.idCliente);
      }).catch((err) => {
        if (err) {

        } else {
        }
      });
  }



  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.preco;
  }, 0);



  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);


  }




  async function handleConfirmOrder() {
    var value = await AsyncStorage.getItem('@user')
    const payload = {
      cliente: {
        idCliente: value,
      },
      data_pedido: "",
      dinheiro: "",
      hora_retirada: "",
      observacao: selectedTable,
      pendencia: "",
      retirada: "",
      status: "Reserva",
      troco: "",
      valor_total: "",
      itens: cartItems.map((cartItem) => ({

        produto: {
          idProduto: cartItem.product.idProduto

        }

      }))

    };
    console.log(JSON.stringify(payload, null, 2))
    //para aparecer o pedido confirmado   setIsModalVisible(true);

    await api.post('api/pedidos/cadastrarReserva', payload);
    setIsModalVisible(true);
  }
  return (
    <>

      <OrderConfirmedModal onOk={handleOk} visible={isModalVisble} />

      {
        cartItems.length > 0 && (
          <FlatList
            data={cartItems}
            style={{ marginBottom: 20, maxHeight: 130 }}
            keyExtractor={cartItem => cartItem.product.idProduto}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: cartItem }) => (
              <Item>
                <ProductContainer>

                  <QuantityContainer>
                    <Text size={14} color='#666'>{cartItem.quantity}x</Text>
                  </QuantityContainer>

                  <ProductDetails>
                    <Text size={14} weight='600'>{cartItem.product.nome}</Text>
                    <Image source={{ uri: cartItem.product.imagem }} />
                    <Text size={14} color='#666' style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.preco)}</Text>
                  </ProductDetails>

                </ProductContainer>

                <Actions>

                  <TouchableOpacity onPress={() => onAdd(cartItem.product)} style={{ marginRight: 24 }}><Text>➕</Text></TouchableOpacity>

                  <TouchableOpacity onPress={() => onDrecement(cartItem.product)}><Text>➖</Text></TouchableOpacity>

                </Actions>
              </Item>
            )}
          />

        )
      }
      <Summary>
        <TotalContainer>
          {
            cartItems.length > 0 ? (
              <>
                <Text color='#666'>Total</Text>
                <Text size={20} weight='600'>{formatCurrency(total)}</Text></>
            ) : (
              <Text color='#999'>Seu carrinho está vazio</Text>
            )
          }
        </TotalContainer>

        <Button loading={isLoading} disabled={cartItems.length === 0} onPress={handleConfirmOrder}>Confirmar pedidos</Button>
      </Summary>
    </>
  );
}
