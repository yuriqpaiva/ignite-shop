import { globalStyles } from '@/styles/global';
import type { AppProps } from 'next/app';
import { Container } from '@/styles/pages/app';
import { CartProvider } from '@/contexts/CartContext';
import { Header } from '@/components/Header';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
