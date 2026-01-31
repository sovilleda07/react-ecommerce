import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import { productService } from '../../services/productService';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const allProducts = await productService.getProducts();
      
      if (search) {
         setProducts(allProducts.filter(p => {
           const lowerSearch = search.toLowerCase();
           return p.name.toLowerCase().includes(lowerSearch) || 
                  p.keywords.some(k => k.toLowerCase().includes(lowerSearch));
         }));
      } else {
         setProducts(allProducts);
      }
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
