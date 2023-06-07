/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { BuilderComponent } from '@builder.io/react'

const Navbar = () => {
  return (
    <Box
      as="header"
      sx={{
        margin: `0 auto`,
        maxWidth: 1920,
        py: 2,
        px: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <BuilderComponent model="navbar" />
    </Box>
  )
}

export default Navbar
