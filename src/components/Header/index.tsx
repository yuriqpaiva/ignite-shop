import Image from 'next/image';
import { HeaderContainer } from './styles';
import { CartSideBar } from '../CartSideBar';
import { Handbag } from '@phosphor-icons/react';
import logoImg from '@/assets/logo.svg';
import { useCart } from '@/contexts/CartContext';

export function Header() {
  const {
    productsQuantity,
    isCartSideBarOpen,
    closeCartSideBar,
    openCartSideBar,
  } = useCart();

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
      <CartSideBar isOpen={isCartSideBarOpen} onClose={closeCartSideBar} />
      <button
        onClick={openCartSideBar}
        className={productsQuantity > 0 ? 'fullCart' : 'emptyCart'}
      >
        <Handbag weight="bold" size={24} />
        {productsQuantity > 0 && <span>{productsQuantity}</span>}
      </button>
    </HeaderContainer>
  );
}
