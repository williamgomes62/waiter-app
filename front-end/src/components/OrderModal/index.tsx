import { Actions, ModalBody, OrderDatails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading
}: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type='button' onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar modal" />
          </button>
        </header>
        <div className='status-container'>
          <small>Status do pedido</small>
        </div>
        <div>
          <span>
            {order.status === 'WAITING' && '🕒'}
            {order.status === 'IN_PRODUCTION' && '⌛'}
            {order.status === 'DONE' && '✅'}
          </span>
          <strong>
            {order.status === 'WAITING' && 'Fila de espera.'}
            {order.status === 'IN_PRODUCTION' && 'Em preparação.'}
            {order.status === 'DONE' && 'Pronto!'}
          </strong>
        </div>
        <OrderDatails>
          <strong>Itens</strong>
          <div className='order-items'>
            {order.products.map(({ _id, product, quantity }) => (
              <div className='item' key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width='56'
                  height='28.51'
                />
                <span className='quantity'>{quantity}x</span>
                <div className='product-details'>
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='total'>
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDatails>
        <Actions>
          <button
            type='button'
            className='primary'
            disabled={isLoading}
          >
            <span>⌛</span>
            <strong>Iniciar Produção</strong>
          </button>
          <button
            type='button'
            className='secundary'
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}