import React, { useEffect, useState } from 'react';
import styles from './VendorList.module.css';

interface Vendor {
  id: string;
  featuredImage: string;
  title: string;
}

const VendorList: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[] | undefined>(undefined);

  useEffect(() => {
    fetch('https://mvmapi.webkul.com/api/v2/public/seller-profiles.json?limit=50&page=0&sort_by=name_ascending&shop_name=BuzzWeed', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data); // Add this line to check the data returned
        setVendors(data.vendors)
    })
    .catch(err => console.error(err));
  }, []);

  if (!vendors) {
    // The data hasn't been loaded yet, so render a loading indicator or return null
    return <div>Loading vendors...</div>;
  }

  if (vendors.length === 0) {
    // The vendors array is empty, so render a message or return null
    return <div>No vendors found.</div>;
  }

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




