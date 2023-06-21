import React from 'react';
import Link from 'next/link';
import styles from './ShopNowButton.module.css';

const ShopNowButton = () => (
  <Link href="/shop">
    <a className={styles.shopNowButton}>Shop Now</a>
  </Link>
);

export default ShopNowButton;
