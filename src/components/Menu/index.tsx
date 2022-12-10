import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import {ProductContainer, Image, ProductDetails, Separator, AddToCartButton} from './styles';
import { ProductModal } from '../ProductModal';
import { useState } from 'react';
import { Product } from '../../types/Product';


type MenuProps = {
  onAddToCart: (product: Product) => void;
  produtos: Product[];
}

export function Menu({onAddToCart, produtos}: MenuProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }



    return (
      
  <>
  <ProductModal visible={isModalVisible} 
  onClose={() => setIsModalVisible(false)}
  product={selectedProduct}
  onAddToCart={onAddToCart}
  />
        <FlatList
        style={{marginTop: 32}}
        contentContainerStyle={{paddingHorizontal: 24}}
        ItemSeparatorComponent={Separator}
        data={produtos}
        keyExtractor={product => product.idProduto}
        renderItem={({item: product}) => (
            <ProductContainer onPress={() => handleOpenModal(product)}>
                <Image source={{uri: product.imagem}}/>
                <ProductDetails>
                 {/* <Text weight="600">{product.categoria.categoria}
                </Text> 
                 */}
                <Text size={14} style={{marginVertical: 8}}>{product.nome}</Text>

                <Text size={14} weight="600">{formatCurrency(product.preco)}</Text>

                </ProductDetails>
                <TouchableOpacity onPress={() => onAddToCart (product)} >
                <Text size={36} weight="700" color="#FF8533">+</Text>
                </TouchableOpacity>
            </ProductContainer>
        ) }
        />
  
  </>
  
    );
 }