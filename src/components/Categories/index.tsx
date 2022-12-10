import { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';

import { Category } from '../../types/Category';
import { Text } from '../Text';
import { CategoryContainer, Icon, Imagem } from './styles';

type CategoriesProps = {
  categoria: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categoria, onSelectCategory }: CategoriesProps) {

  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
    onSelectCategory(category);
  }

   
  return (
    <View> 
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categoria}
      contentContainerStyle={{paddingRight: 24}}
      keyExtractor={category => category.id}
      renderItem={({item: category}) => {


        return(
          
          <CategoryContainer onPress={() => handleSelectCategory(category.id)}>
            <Icon>
              <Imagem source={{uri:category.fotos}}/>
            </Icon>
            <Text size={14} weight='600'>{category.categoria}</Text>
          </CategoryContainer>
          
        );
      }}
    />
</View>
  );
}