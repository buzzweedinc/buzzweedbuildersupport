import React from 'react';
import axios from 'axios';
import styles from './Product.module.css';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

type ProductProps = {
  product: {
    id: number;
    product_name: string;
    price: string;
    vendor: string;
    images: string;
    review_avg: string;
  }
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{product.product_name}</title>
        <meta name="description" content={product.product_name} />
      </Head>
      <img src={product.images} alt={product.product_name} className={styles.productImage} />
      <h1 className={styles.productTitle}>{product.product_name}</h1>
      <h2 className={styles.productPrice}>${product.price}</h2>
      <p className={styles.vendor}>Vendor: {product.vendor}</p>
      <p className={styles.review}>Average review: {product.review_avg}</p>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { productId } = context.params!;
  const res = await axios.get(`https://mvmapi.webkul.com/api/v2/public/products.json?limit=50&sort_by=date_add&sort_order=desc&shop_name=3e57b7.myshopify.com`);
  
  const product = res.data.products.find((product: {id: number}) => product.id.toString() === productId);

  return {
    props: { product },
  };
};

export default Product;

