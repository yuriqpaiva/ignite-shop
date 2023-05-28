import { globalStyles } from '@/styles/global';
import type { AppProps } from 'next/app';
import logoImg from '../assets/logo.svg';
import { Container, Header } from '@/styles/pages/app';
import Image from 'next/image';
import { Handbag, X } from '@phosphor-icons/react';
import { CartProvider } from '@/contexts/CartContext';
import { useState } from 'react';
import { CartSideBar } from '@/components/CartSideBar';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [isCartSideBarOpen, setIsCartSideBarOpen] = useState(false);
  console.log(isCartSideBarOpen);

  function toggleCartSideBar() {
    setIsCartSideBarOpen((prevState) => !prevState);
  }

  return (
    <CartProvider>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <CartSideBar isOpen={isCartSideBarOpen} onClose={toggleCartSideBar} />
          <button onClick={toggleCartSideBar}>
            <Handbag weight="bold" color="#fff" size={24} />
          </button>
        </Header>

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
