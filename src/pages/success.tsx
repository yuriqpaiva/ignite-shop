import { stripe } from '@/lib/stripe';
import { ImageContainer, SuccessContainer } from '@/styles/pages/success';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <div>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={140} height={140} alt="" />
            </ImageContainer>
          ))}
        </div>

        <h1>Compra efetuada</h1>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{'\n'}
          <strong>{products.length}</strong> camisetas já está a caminho da sua
          casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false, // Occurs only if the session_id is not present
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details?.name;
  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      id: product?.id,
      name: product?.name,
      imageUrl: product?.images[0],
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
