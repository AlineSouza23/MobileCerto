import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { Container, FooterContainer, CategoriesContainer,MenuContainer, Footer, CenteredContainer } from './styles';
import { Category } from '../types/Category';



function Main({route, navigation}:{
  route: any;
  navigation: any;
}): JSX.Element {

  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const email = route.params?.email


  useEffect(() => {

    Promise.all([
      api.get('api/categoria/findAll'),
      api.get('api/produto/findAll')])
      .then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      });



  }, []);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false);
  }

  async function handleSelectCategory(id: string) {

    const route = !id
      ? `api/produto/findAll`
      : `api/produto/linkCategoria/${id}`;

    setIsLoadingProducts(true);

    const { data } = await api.get(route);

    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {

    if(!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems(prevState => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product.idProduto === product.idProduto);

      if(itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;

    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems(prevState => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product.idProduto === product.idProduto);

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if(item.quantity === 1) {

        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });
  }


  return (
    <>
      <TableModal visible={isTableModalVisible} onClose={() => setIsTableModalVisible(false)} onSave={handleSaveTable}/>

      <Container>
        <Header onCancelOrder={handleResetOrder} selectedTable={selectedTable}/>



        {
          isLoading ? (
            <CenteredContainer>
              <ActivityIndicator color='#D73035' size='large'/>
            </CenteredContainer>

          ) :
            (
              <>
                <CategoriesContainer>
                  <Categories onSelectCategory={handleSelectCategory} categoria={categories}/>
                </CategoriesContainer>

                {isLoadingProducts ? (
                  <CenteredContainer>
                    <ActivityIndicator color='#D73035' size='large'/>
                  </CenteredContainer>
                ): (
                  <>
                    {
                      products.length > 0 ? (
                        <MenuContainer>
                          <Menu produtos={products} onAddToCart={handleAddToCart}/>
                        </MenuContainer>
                      ) : (
                        <CenteredContainer>
                          <Empty />
                          <Text color='#666' style={{marginTop: 24}}>Nenhum produto foi encontrado!</Text>
                        </CenteredContainer>
                      )
                    }
                  </>
                )}


              </>
            )
        }

      </Container>

      <Footer>
        <FooterContainer>
          {
            !selectedTable && (
              <Button disabled={isLoading} onPress={() => setIsTableModalVisible(true)}>
              Novo pedido
              </Button>
            )
          }

          {
            selectedTable && (
              <Cart selectedTable={selectedTable} onConfirmOrder={handleResetOrder} onDrecement={handleDecrementCartItem} onAdd={handleAddToCart} cartItems={cartItems}/>
           
           
              )
          }
        </FooterContainer>
      </Footer>
    </>
  );
}

export default Main;
