import { Modal } from 'react-native';
import { Product } from '../../types/Products';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { CloseButton, Header, Image, ModalBody } from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        // source={{ vira da api
        //   uri:
        // }}
        source={require('../../assets/1668645450167-quatro-queijos.png')}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight='600'>{product.name}</Text>
          <Text color='#666'>{product.description}</Text>
        </Header>
      </ModalBody>
    </Modal>
  );
}