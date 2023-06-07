// CartButton.tsx
import React from 'react'
import { Bag } from '@components/icons'
import { useUI } from '@components/common/context'

interface CartButtonProps {
  ariaLabel?: string
}

const CartButton: React.FC<CartButtonProps> = ({ ariaLabel = 'Cart' }) => {
  const { openSidebar } = useUI()
  return (
    <div className="cart-button-container">
      <button onClick={openSidebar} aria-label={ariaLabel} className="cart-button">
        <Bag />
      </button>
    </div>
  )
}

export default CartButton
export {}


