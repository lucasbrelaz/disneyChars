import { Typography } from "@mui/material"

const SystemLoading = () => {
  const styleSystemLoading = {
    margin: 'auto',
    textAlign: 'center'
  }

  return (
    <Typography sx={styleSystemLoading} variant="h5" gutterBottom>
      Carregando...
    </Typography>
  )
}

export default SystemLoading