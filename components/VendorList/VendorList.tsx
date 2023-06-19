import React, { useEffect, useState } from 'react';
import styles from './VendorList.module.css';

// Define a type for your vendor data
interface Vendor {
  id: string;
  title: string;
  featuredImage: string;
}

const VendorList: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    fetch('https://mvmapi.webkul.com/api/v2/public/vendors.json?limit=50&shop_name=3e57b7', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setVendors(data.vendors))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.vendorList}>
      {vendors.map(vendor => (
        <div key={vendor.id} className={styles.vendorCard}>
          <img src={vendor.featuredImage} alt={vendor.title} className={styles.vendorImage} />
          <h2 className={styles.vendorTitle}>{vendor.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default VendorList;

