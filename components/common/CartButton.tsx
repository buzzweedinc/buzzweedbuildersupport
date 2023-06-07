// CartButton.tsx
import React from 'react'
import { Box, Button } from 'theme-ui'
import { Bag } from '@components/icons'
import { useUI } from '@components/common/context'

interface CartButtonProps {
  ariaLabel?: string
}

const CartButton: React.FC<CartButtonProps> = ({ ariaLabel = 'Cart' }) => {
  const { openSidebar } = useUI()
  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: 140,
        width: '100%',
        justifyContent: ['space-between', 'flex-end'],
      }}
    >
      <Button onClick={openSidebar} aria-label={ariaLabel}>
        <Bag />
      </Button>
    </Box>
  )
}

export default CartButton

// Add this line
export {}
