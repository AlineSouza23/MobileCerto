import { FlatList, Modal, View } from 'react-native';


import { Image, CloseButton, ModalBody, Header, IngredientsContainer, Ingredient, Footer, FooterContainer, PriceContainer } from './styles';

import { Product } from '../../types/Product';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';

interface ProductModalProps{
  visible: boolean;
  onClose: () => void;
  product: null| Product;
  onAddToCart: (product: Product) => void;
  
  }
  
  export function ProductModal({visible, onClose, product, onAddToCart}: ProductModalProps){
  
      {/*se não tive produto, não renderizar nada */}
      if (!product){
      return null;
  }
  
  function handleAddToCart(){
      onAddToCart(product!);
      onClose();
  }
  
  return(
    
          <Modal visible={visible}
           animationType="slide" 
           presentationStyle="pageSheet"
           onRequestClose={onClose}
            
           >
              <Image
              source={{uri: product.imagem}}
              >
              <CloseButton onPress={onClose}>
                  <Text>x</Text>
              </CloseButton>
              </Image>
  
              <ModalBody>
              <Header><Text size={30} weight="600">Produto: {product.nome}</Text></Header>
             {/* <Header><Text weight="400">Categoria : {product.categoria.categoria}</Text></Header> */}
  
              <Text> {'\n'}</Text>
              <Header><Text>Cantina Gomes - Senai Ricardo Lerner</Text></Header>
              <Header><Text>Adicione diversos itens em seu carrinho 😉</Text></Header>
  
              </ModalBody>
  
              <Footer>
                  <FooterContainer>
                      <PriceContainer>
                          <Text>Preço</Text>
                          <Text size={20} weight="600">{formatCurrency(product.preco)}</Text>
                      </PriceContainer>
                <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
                  </FooterContainer>
              </Footer>
          </Modal>
          
      )
  }