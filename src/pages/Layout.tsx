import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Box
      className="layout-container"
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Outlet />
    </Box>
  )
}

export default Layout
