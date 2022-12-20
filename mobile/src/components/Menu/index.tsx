import { useState } from 'react';
import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { Product } from '../../types/Products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import {
  ProductContainer,
  ImageDetails,
  ProductDetails,
  Separator, AddToCardButton
} from './styles';

export function Menu() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ImageDetails
              // source={{
              //   : `http://10.0.0.104:3001/uploads/${product.imagePath}`,
              // }}
              source={require('../../assets/1668645450167-quatro-queijos.png')}
            />
            <ProductDetails>
              <Text weight='600'>{product.name}</Text>
              <Text size={14} color={'#666'} style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight={'600'}>{formatCurrency(product.price)}</Text>
            </ProductDetails>
            <AddToCardButton>
              <PlusCircle />
            </AddToCardButton>
          </ProductContainer>
        )}
      />
    </>
  );
}