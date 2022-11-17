import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Link } from '@mui/material'
import systemLogo from '../assets/img/disney_white.webp'
import { blueGrey } from '@mui/material/colors'
import SystemFooter from 'components/SystemFooter'


const Layout = () => {
  const trigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: false,
  });

  const secondary = blueGrey.A700;

  const styleSystemLogo = {
    width: 100,
    height: 'auto',
    margin: 'auto'
  }

  const styleBoxMainWrapper = {
    width: 1 / 1,
    maxWidth: 1080,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  }

  const styleToolbar = {
    margin: 'auto'
  }

  return <>
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Toolbar id="back-to-top-anchor" sx={styleToolbar}>
          <Link href="/"><Box component="img" sx={styleSystemLogo} src={systemLogo} /></Link>
        </Toolbar>
      </AppBar>
    </Slide>

    <Box sx={styleBoxMainWrapper}>
      <Outlet />
    </Box>

    <SystemFooter />
  </>
}

export default Layout
