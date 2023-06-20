import React, { useEffect, useState } from 'react';
import styles from './VendorList.module.css';
import Link from 'next/link';

interface Seller {
  id: string;
  sp_store_name: string;
  store_banner: string;
  store_logo: string;
}

const VendorList: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[] | undefined>(undefined);

  useEffect(() => {
    fetch('https://mvmapi.webkul.com/api/v2/public/seller-profiles.json?limit=50&page=0&sort_by=name_ascending&shop_name=3e57b7.myshopify.com', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setSellers(data.sellers)
    })
    .catch(err => console.error(err));
  }, []);

  if (!sellers) {
    return <div>Loading vendors...</div>;
  }

  return (
    <div className={styles.vendorList}>
      {sellers.map(seller => (
        <Link href={`/vendor/${seller.id}`} key={seller.id}>
          <a className={styles.vendorCardList}>
            <img src={seller.store_banner} alt={seller.sp_store_name} className={styles.vendorImageList} />
            <h2 className={styles.vendorTitleList}>{seller.sp_store_name}</h2>
          </a>
        </Link>
      ))}
    </div>
  );
}

export default VendorList;


