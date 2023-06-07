// CartButton.tsx
import React from 'react'
import { Box, Button } from 'theme-ui'
import { Bag } from '@components/icons'
import { useUI } from '@components/common/context'

interface CartButtonProps {
  ariaLabel?: string
  customStyles?: Record<string, any> // <-- Add this line
}

const CartButton: React.FC<CartButtonProps> = ({ ariaLabel = 'Cart', customStyles = {} }) => { // <-- Modify this line
  const { openSidebar } = useUI()
  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: 140,
        width: '100%',
        justifyContent: ['space-between', 'flex-end'],
        ...customStyles, // <-- Add this line
      }}
    >
      <Button onClick={openSidebar} aria-label={ariaLabel} sx={customStyles}>  
        <Bag />
      </Button>
    </Box>
  )
}

export default CartButton

// Add this line
export {}

