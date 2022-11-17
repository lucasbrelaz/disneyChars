import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import CharModal from 'components/CharModal'
import { Box } from '@mui/system'
import Swal from 'sweetalert2'
import Alert from '@mui/material/Alert'
import IDisneyChar from 'shared/IDisneyChar'
import noImage from '../assets/img/no_image.webp'
import SystemLoading from 'components/SystemLoading'

interface IPageData {
  count: number
  nextPage: string
  previousPage?: string
  totalPages: number
}

const Home = () => {
  const [pageData, setPageData] = useState<IPageData>()
  const [chars, setChars] = useState([])
  const [charId, setCharId] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [errorGettingData, setErrorGettingData] = useState(false)

  useEffect(() => {
    populateChars()
  }, []);

  const openModalFunction = (id = 0) => {
    setCharId(id)
    setOpenModal(true)
  }
  const closeModalFunction = () => {
    setOpenModal(false)
  }

  const populateChars = (url = 'https://api.disneyapi.dev/characters') => {
    axios.get(url)
      .then((response) => {
        setErrorGettingData(false)
        setPageData(response.data)
        setChars(response.data.data)
      })
      .catch(() => {
        setErrorGettingData(true)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro ao conectar com o servidor',
          showConfirmButton: false,
          timer: 4000
        })
      })
  }

  const navigatePrevious = (footer = false) => {
    (footer) ? window.scrollTo(0, 0) : null
    populateChars(pageData?.previousPage)
  }

  const navigateNext = (footer = false) => {
    (footer) ? window.scrollTo(0, 0) : null
    populateChars(pageData?.nextPage)
  }

  const styleCardMedia = {
    width: 300,
    margin: 'auto',
    cursor: 'pointer',
    transform: 'translateY(0)',
    transition: '.2s ease-in-out transform',
    '&:hover': {
      transform: 'translateY(-4px)',
    }
  }

  const styleBoxCenter = {
    margin: 'auto',
    textAlign: 'center'
  }

  return (
    <>
      {errorGettingData ?
        <Alert severity='error'>Erro ao conectar com o servidor. Tente atualizar a página.</Alert> :
        pageData ?
          <Box component="div" sx={styleBoxCenter}>
            <Typography color="primary" mt={2} mb={2} variant="h2">
              Disney Chars
            </Typography>
            <Typography className="text-secondary" mt={2} mb={2} variant="h5">
              Exibindo {(pageData?.count || '')} personagens
            </Typography>

            {(pageData?.previousPage) ?
              <Typography className="text-secondary" mt={2} mb={2} variant="h6">
                {'Página ' + (Number(pageData?.previousPage?.replace(/^\D+/g, '')) + 1) + ' de ' + pageData.totalPages}
              </Typography> :
              <Typography className="text-secondary" mt={2} mb={2} variant="h6">
                {'Página  1 de ' + (pageData?.totalPages || '')}
              </Typography>}
          </Box>
          : <SystemLoading />
      }

      {/* Pagination Top */}
      <Box component="div" sx={{ ...styleBoxCenter, marginBottom: 4 }}>
        {pageData?.previousPage ? <>
          <Button
            onClick={() => navigatePrevious()}
            variant="outlined" startIcon={<NavigateBeforeIcon />}>
            Voltar
          </Button>
        </> : ''}
        {pageData?.nextPage ? <>
          <Button
            sx={{ marginLeft: 2 }}
            onClick={() => navigateNext()}
            variant="outlined" endIcon={<NavigateNextIcon />}>
            Avançar
          </Button>
        </> : ''}
      </Box>

      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, sm: 4, md: 4 }}
      >

        {chars.map((char: IDisneyChar) => (
          <Grid item
            key={char._id}
            justifyContent="center"
            alignItems="center"
            xs={12} sm={6} md={4}>
            <Card
              sx={styleCardMedia}
              onClick={() => openModalFunction(char._id)}
            >
              <CardMedia
                component="img"
                alt={char.name}
                height="300"
                image={char.imageUrl || noImage}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {char.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Footer */}
      <Box component="div" sx={{ ...styleBoxCenter, margin: 4 }}>
        {pageData?.previousPage ? <>
          <Button
            onClick={() => navigatePrevious(true)}
            variant="outlined" startIcon={<NavigateBeforeIcon />}>
            Voltar
          </Button>
        </> : ''}
        {pageData?.nextPage ? <>
          <Button
            sx={{ marginLeft: 2 }}
            onClick={() => navigateNext(true)}
            variant="outlined" endIcon={<NavigateNextIcon />}>
            Avançar
          </Button>
        </> : ''}
      </Box>

      <CharModal charId={charId} showModal={openModal} closeModal={closeModalFunction} />
    </>
  )
}

export default Home
