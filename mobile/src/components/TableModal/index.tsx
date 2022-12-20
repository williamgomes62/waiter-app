import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Text } from '../Text';
import { Close } from '../Icons/Close';
import { Button } from '../Buttons';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
}

export function TableModal({ visible, onClose } : TableModalProps) {

  return (
    <Modal
      transparent
      visible={visible}
      animationType='fade'
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666' />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor={'#666'}
              keyboardType='number-pad'
            />
            <Button onPress={() => null}>Salvar</Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}