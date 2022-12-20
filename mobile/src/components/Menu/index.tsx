import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import {
  Product,
  ImageDetails,
  ProductDetails,
  Separator, AddToCardButton
} from './styles';

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={product => product._id}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => (
        <Product>
          <ImageDetails
            // source={{
            //   uri: `http://10.0.0.104:3001/uploads/${product.imagePath}`,
            // }}
            source={require('../../assets/1668645450167-quatro-queijos.png')}
          />
          <ProductDetails>
            <Text weight='600'>{product.name}</Text>
            <Text size={14} color={'#666'} style={{ marginVertical: 8}}>
              {product.description}
            </Text>
            <Text size={14} weight={'600'}>{formatCurrency(product.price)}</Text>
          </ProductDetails>
          <AddToCardButton>
            <PlusCircle />
          </AddToCardButton>
        </Product>
      )}
    />
  );
}