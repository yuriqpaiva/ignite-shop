import { ReactNode, createContext, useContext, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  quantity?: number;
}

interface CartContextProps {
  products: Product[];
  addProduct: (product: Product) => void;
  productsQuantity: number;
  productsTotalValue: string;
}

const CartContext = createContext({} as CartContextProps);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const productsQuantity = products.length;
  const productsTotalValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(
    products.reduce((acc, product) => {
      const numericString = product.price.replace(/\D/g, '');
      const amount = parseFloat(numericString);

      return acc + amount;
    }, 0) / 100
  );

  function addProduct(productToBeAdded: Product) {
    const existingProductIndex = products.findIndex(
      (product) => product.id === productToBeAdded.id
    );

    if (existingProductIndex !== -1) {
      // const updatedProducts = [...products];
      // updatedProducts[existingProductIndex].quantity =
      //   (updatedProducts[existingProductIndex].quantity || 0) + 1;

      // setProducts(updatedProducts);
      return;
    } else {
      setProducts([...products, { ...productToBeAdded, quantity: 1 }]);
    }
  }

  return (
    <CartContext.Provider
      value={{ products, addProduct, productsQuantity, productsTotalValue }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
