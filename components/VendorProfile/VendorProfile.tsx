import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './VendorProfile.module.css';

interface Seller {
  id: string;
  sp_store_name: string;
  store_banner: string;
  store_logo: string;
}

interface Product {
  id: string;
  title: string;
  featuredImage: string;
}

const VendorProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [seller, setSeller] = useState<Seller | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`https://mvmapi.webkul.com/api/v2/public/seller-profiles/${id}.json`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        setSeller(data.seller);
      })
      .catch(err => console.error(err));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`https://mvmapi.webkul.com/api/v2/public/products.json?seller_id=${id}`, {
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
    }
  }, [id]);

  if (!seller) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.vendorProfile}>
      <img className={styles.vendorBannerProfile} src={seller.store_banner} alt={seller.sp_store_name} />
      <h1 className={styles.vendorTitleProfile}>{seller.sp_store_name}</h1>
      <div className={styles.productListProfile}>
        {products.map(product => (
          <div className={styles.productCardProfile} key={product.id}>
            <img className={styles.productImageProfile} src={product.featuredImage} alt={product.title} />
            <h2 className={styles.productTitleProfile}>{product.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VendorProfile;


