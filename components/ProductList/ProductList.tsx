import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css'; // Update this as necessary

interface Product {
  id: number;
  product_name: string;
  handle: string;
  price: string;
  vendor: string;
  seller_name: string;
  vendor_handle: string;
  product_policy: null | string;
  custom_fields: any[];
  images: string;
  review_avg: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
    return <div>Loading products...</div>;
  }

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <div className={styles.productCard} key={product.id}>
          <img src={product.images} alt={product.product_name} className={styles.productImage} />
          <h2 className={styles.productTitle}>{product.product_name}</h2>
          <p className={styles.productVendor}>Vendor: {product.vendor}</p>
          <p className={styles.productPrice}>Price: {product.price}</p>
          <p className={styles.productReview}>Average Review: {product.review_avg}</p>
          {/* Add more product details as needed */}
        </div>
      ))}
    </div>
  );
}

export default ProductList;


