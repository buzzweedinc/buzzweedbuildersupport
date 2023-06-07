// CartButton.tsx
import React from 'react'
import { Bag } from '@components/icons'
import { useUI } from '@components/common/context'

interface CartButtonProps {
  ariaLabel?: string,
  buttonStyle?: React.CSSProperties, // Add this
}

const CartButton: React.FC<CartButtonProps> = ({ ariaLabel = 'Cart', buttonStyle }) => {
  const { openSidebar } = useUI()
  return (
    <div className="cart-button-container">
      <button 
        onClick={openSidebar} 
        aria-label={ariaLabel} 
        className="cart-button" 
        style={buttonStyle} // Use it here
      >
        <Bag />
      </button>
    </div>
  )
}

export default CartButton
export {}



