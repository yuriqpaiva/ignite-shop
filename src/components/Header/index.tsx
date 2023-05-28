import Image from 'next/image';
import { HeaderContainer } from './styles';
import { CartSideBar } from '../CartSideBar';
import { Handbag } from '@phosphor-icons/react';
import logoImg from '@/assets/logo.svg';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Header() {
  const {
    productsQuantity,
    isCartSideBarOpen,
    closeCartSideBar,
    openCartSideBar,
  } = useCart();

  const router = useRouter();

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      <CartSideBar isOpen={isCartSideBarOpen} onClose={closeCartSideBar} />
      {router.pathname !== '/success' && (
        <button
          onClick={openCartSideBar}
          className={productsQuantity > 0 ? 'fullCart' : 'emptyCart'}
        >
          <Handbag weight="bold" size={24} />
          {productsQuantity > 0 && <span>{productsQuantity}</span>}
        </button>
      )}
    </HeaderContainer>
  );
}
