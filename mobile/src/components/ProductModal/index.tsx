import { FlatList, Modal } from 'react-native';
import { Product } from '../../types/Products';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Buttons';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import {
  CloseButton,
  Header,
  Image,
  IngredientsContainer,
  ModalBody,
  Ingredient,
  FooterContainer,
  Footer,
  PriceContainer,
} from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `data:image/jpeg;base64,${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight='600'>{product.name}</Text>
          <Text color='#666' style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>
        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight='600' color='#666'>Ingredientes</Text>
            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color='#666' style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666'>Pre??o</Text>
            <Text size={20} weight='600'>{formatCurrency(product.price)}</Text>
          </PriceContainer>
          <Button onPress={handleAddToCart}>
            Adicionar ao pedido
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}