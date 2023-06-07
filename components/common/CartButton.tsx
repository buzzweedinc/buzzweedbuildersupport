// CartButton.tsx
import React from 'react'
import { Bag } from '@components/icons'
import { useUI } from '@components/common/context'
import styles from './CartButton.module.css' // Import the CSS module here

interface CartButtonProps {
  ariaLabel?: string
}

const CartButton: React.FC<CartButtonProps> = ({ ariaLabel = 'Cart' }) => {
  const { openSidebar } = useUI()
  return (
    <div className="cart-button-container">
      <button onClick={openSidebar} aria-label={ariaLabel} className={styles.button}>
        {/* Apply the 'button' class from your CSS module */}
        <Bag />
      </button>
    </div>
  )
}

export default CartButton
export {}
