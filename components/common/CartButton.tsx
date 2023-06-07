// CartButton.tsx
import React from 'react'
import { Bag } from '@components/icons'
import { useUI } from '@components/common/context'
import styles from './CartButton.module.css'

interface CartButtonProps {
  ariaLabel?: string
}

const CartButton: React.FC<CartButtonProps> = ({ ariaLabel = 'Cart' }) => {
  const { openSidebar } = useUI()
  return (
    <div className={styles.cartButtonContainer}>
      <button onClick={openSidebar} aria-label={ariaLabel} className={styles.cartButton}>
        <Bag />
      </button>
    </div>
  )
}

export default CartButton
export {}