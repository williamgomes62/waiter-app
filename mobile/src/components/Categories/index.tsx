import { useState } from 'react';
import { FlatList } from 'react-native';
import { Category } from '../../types/Category';
import { Text } from '../Text';
import { CategoryContainer, Icon } from './styles';

interface CategoryProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    onSelectCategory(category);
    setSelectedCategory(category);
  }


  return (
    <>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingRight: 24 }}
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={category => category._id}
        renderItem={({ item: category }) => {
          const isSelected = selectedCategory === category._id;
          return ( // renomeia item para
            <CategoryContainer onPress={() => handleSelectCategory(category._id)}>
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5}>
                  {category.icon}
                </Text>
              </Icon>
              <Text size={14} weight='600' opacity={isSelected ? 1 : 0.5}>
                {category.name}
              </Text>
            </CategoryContainer>
          );
        }}
      />
    </>
  );
}