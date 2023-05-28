import { useEffect, useRef, useState } from 'react';
import { X } from '@phosphor-icons/react';
import { CartSideBarContainer, CartSummary } from './styles';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import axios from 'axios';

interface CartSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSideBar({ isOpen, onClose }: CartSideBarProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const { products, productsQuantity, productsTotalValue, removeProduct } =
    useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', products);

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      // Connect to observability service
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!');
    }
  }

  return (
    <CartSideBarContainer ref={cartRef} className={isOpen ? 'showCart' : ''}>
      <button onClick={onClose}>
        <X size={24} weight="bold" />
      </button>
      <h3>Sacola de compras</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Image src={product.imageUrl} alt="" width={102} height={93} />
            <div>
              <div>
                <span>{product.name}</span>
                <strong>{product.price}</strong>
              </div>
              <div>
                <button onClick={() => removeProduct(product.id)}>
                  Remover
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <CartSummary>
        <div className="quantityContainer">
          <span>Quantidade</span>
          <strong>{productsQuantity} itens</strong>
        </div>
        <div className="totalValueContainer">
          <span>Valor total</span>
          <strong>{productsTotalValue}</strong>
        </div>
        <button onClick={handleBuyProducts}>Finalizar compra</button>
      </CartSummary>
    </CartSideBarContainer>
  );
}
