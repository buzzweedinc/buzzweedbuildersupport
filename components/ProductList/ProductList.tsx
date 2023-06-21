import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css'; // Update this as necessary

interface ProductType {
  id: string;
  type_name: string;
}

interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_url: string; // replace this with actual image URL property if it exists
  price: string;
  type: ProductType;
  // add any other properties returned in the product object that you need
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load the products when the component mounts
  useEffect(() => {
    fetch('https://mvmapi.webkul.com/api/v2/public/products.json?limit=50&sort_by=date_add&sort_order=desc&shop_name=3e57b7.myshopify.com', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      setProducts(data.products);
    })
    .catch(err => console.error(err));
  }, []);

  if (!products) {
    // The data hasn't been loaded yet, so render a loading indicator or return null
    return <div>Loading products...</div>;
  }

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <div className={styles.productCard} key={product.id}>
          <img src={product.product_url} alt={product.product_name} className={styles.productImage} /> {/* Replace with actual image property if it exists */}
          <h2 className={styles.productTitle}>{product.product_name}</h2>
          <p className={styles.productDescription}>{product.product_description}</p>
          <p className={styles.productPrice}>Price: {product.price}</p>
          {/* Add more product details as needed */}
        </div>
      ))}
    </div>
  );
}

export default ProductList;

