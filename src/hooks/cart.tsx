import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const dataProducts = await AsyncStorage.getItem('GoMarketPlace:products');

      if (dataProducts) {
        setProducts(JSON.parse(dataProducts));
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const addProduct = {
        ...product,
        quantity: 1,
      };

      setProducts([...products, addProduct]);

      const stateProducts = [...products, addProduct];
      await AsyncStorage.setItem(
        'GoMarketPlace:products',
        JSON.stringify(stateProducts),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const loadProducts = [...products];

      const productIncrement = loadProducts.findIndex(
        product => product.id === id,
      );

      if (productIncrement !== -1) {
        loadProducts[productIncrement].quantity += 1;

        setProducts(loadProducts);
      }

      await AsyncStorage.setItem(
        'GoMarketPlace:products',
        JSON.stringify(loadProducts),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      let loadProducts = [...products];

      const productDec = loadProducts.findIndex(product => product.id === id);

      if (productDec !== -1) {
        if (loadProducts[productDec].quantity === 1) {
          loadProducts = loadProducts.filter(product => product.id !== id);
        } else {
          loadProducts[productDec].quantity -= 1;
        }
      }
      setProducts(loadProducts);

      await AsyncStorage.setItem(
        'GoMarketPlace:products',
        JSON.stringify(loadProducts),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
