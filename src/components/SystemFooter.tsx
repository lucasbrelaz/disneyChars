import { Box, Typography } from '@mui/material'

const SystemFooter = () => {

  const styleFooter = {
    backgroundColor: '#fff',
    borderTop: '1px solid #1976d2',
    margin: 'auto',
    textAlign: 'center',
    padding: 4,
    ' a, a:link': {
      color: '#222',
      textDecoration: 'none'
    }
  }

  return (
    <Box sx={styleFooter} className="system-footer">
      <Typography variant="body2" gutterBottom>
        Desenvolvido por <a href="https://lucasbrelaz.com" target={'_blank'}>Lucas Brelaz</a>
      </Typography>
      <Typography variant="body2" gutterBottom>
        Utilizando a <a href="https://disneyapi.dev/" target={'_blank'}>DisneyApi</a>
      </Typography>
    </Box>
  )
}
export default SystemFooter