import { useEffect, useRef } from 'react';
import { X } from '@phosphor-icons/react';
import { CartSideBarContainer, CartSummary } from './styles';
import Image from 'next/image';
import shirt from '@/assets/camisetas/1.png';
import { useCart } from '@/contexts/CartContext';

interface CartSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSideBar({ isOpen, onClose }: CartSideBarProps) {
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

  return (
    <CartSideBarContainer ref={cartRef} className={isOpen ? 'showCart' : ''}>
      <button onClick={onClose}>
        <X size={24} weight="bold" />
      </button>
      <h3>Sacola de compras</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Image src={shirt} alt="" width={102} height={93} />
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
        <button>Finalizar compra</button>
      </CartSummary>
    </CartSideBarContainer>
  );
}
