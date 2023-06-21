import React, { FC } from 'react';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import styles from './Product.module.css';
import Head from 'next/head';

interface ProductData {
  id: number;
  product_name: string;
  shopify_product_id: number;
  handle: string;
  price: string;
  vendor: string;
  seller_name: string;
  vendor_handle: string;
  product_policy: any;
  custom_fields: any[];
  images: string;
  review_avg: string;
}

interface ProductProps {
  product: ProductData | null;
}

const Product: FC<ProductProps> = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>
  }

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

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
};

export default Product;


