import { HomeContainer, Product } from '@/styles/pages/home';
import Image from 'next/image';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { stripe } from '@/lib/stripe';
import { GetStaticProps } from 'next';
import Stripe from 'stripe';
import Link from 'next/link';
import Head from 'next/head';
import { CaretLeft, Handbag } from '@phosphor-icons/react';
import { useCart } from '@/contexts/CartContext';
import { MouseEvent, useState } from 'react';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    url: string;
    price: string;
    defaultPriceId: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { addProduct, openCartSideBar } = useCart();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  function handleArrowClick(direction: 'left' | 'right') {
    if (direction === 'left') {
      instanceRef.current?.prev();
    } else {
      instanceRef.current?.next();
    }
  }

  function handleAddProductToCart(
    e: MouseEvent,
    product: HomeProps['products'][0]
  ) {
    e.preventDefault();
    addProduct(product);
    openCartSideBar();
  }

  const restLength = products.length - currentSlide;

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {currentSlide !== 0 && (
          <div className="arrowButton">
            <button onClick={() => handleArrowClick('left')}>
              <CaretLeft weight="bold" size={48} />
            </button>
          </div>
        )}
        {restLength > 3 && (
          <div className="arrowButton right">
            <button onClick={() => handleArrowClick('right')}>
              <CaretLeft weight="bold" size={48} />
            </button>
          </div>
        )}

        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <button
                  onClick={(e) => {
                    handleAddProductToCart(e, product);
                  }}
                >
                  <Handbag weight="bold" color="#fff" size={32} />
                </button>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
