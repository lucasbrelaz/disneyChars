import { ListItem, ListItemIcon, ListItemText, Modal, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import BoltIcon from '@mui/icons-material/Bolt'
import AdbIcon from '@mui/icons-material/Adb'
import TheatersIcon from '@mui/icons-material/Theaters'
import MovieIcon from '@mui/icons-material/Movie'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AttractionsIcon from '@mui/icons-material/Attractions'
import SystemLoading from "./SystemLoading"
import IDisneyChar from "shared/IDisneyChar"
import noImage from '../assets/img/no_image.webp'
import Alert from '@mui/material/Alert'
import Swal from 'sweetalert2'
import './charModal.css'

const CustomModal = (props: any) => {
  const [open, setOpen] = useState(false)
  const [char, setChar] = useState<IDisneyChar>()

  useEffect(() => {
    setOpen(props.showModal)

    if (props.showModal) {
      setChar(undefined)

      axios.get(`https://api.disneyapi.dev/characters/${props.charId}`)
        .then((response) => {
          setChar(response.data)
        })
        .catch(() => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Erro ao conectar com o servidor',
            showConfirmButton: true,
            timer: 4000
          })
          props.closeModal()
        })
    }
  }, [props.showModal])

  const styleModalBox = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1 / 1.2,
    maxWidth: 450,
    boxSizing: 'border-box',
    height: 1 / 1.2,
    overflowY: 'auto',
    bgcolor: '#FFF',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  }

  const styleImg = {
    borderRadius: '4px'
  }

  return (
    <Modal
      open={open}
      onClose={() => props.closeModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalBox} className="charModalBox">
        {(char) ?
          <>
            <Typography id="modal-modal-title" variant="h4" component="h2" mb={2}>
              {char.name}
            </Typography>

            <img style={styleImg} src={char.imageUrl || noImage} />

            {char.allies.length > 0 && <Typography variant="h6" mt={2}>Aliados</Typography>}
            {char.allies.map((show) => {
              return (
                <ListItem key={show}>
                  <ListItemIcon>
                    <BoltIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={show}
                  >
                  </ListItemText>
                </ListItem>
              )
            })}

            {char.enemies.length > 0 && <Typography variant="h6" mt={2}>Inimigos</Typography>}
            {char.enemies.map((show) => {
              return (
                <ListItem key={show}>
                  <ListItemIcon>
                    <AdbIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={show}
                  >
                  </ListItemText>
                </ListItem>
              )
            })}

            {char.films.length > 0 && <Typography variant="h6" mt={2}>Filmes</Typography>}
            {char.films.map((show) => {
              return (
                <ListItem key={show}>
                  <ListItemIcon>
                    <TheatersIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={show}
                  >
                  </ListItemText>
                </ListItem>
              )
            })}

            {char.parkAttractions.length > 0 && <Typography variant="h6" mt={2}>Atração dos Parques</Typography>}
            {char.parkAttractions.map((show) => {
              return (
                <ListItem key={show}>
                  <ListItemIcon>
                    <AttractionsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={show}
                  >
                  </ListItemText>
                </ListItem>
              )
            })}

            {char.shortFilms.length > 0 && <Typography variant="h6" mt={2}>Curtas Metragens</Typography>}
            {char.shortFilms.map((show) => {
              return (
                <ListItem key={show}>
                  <ListItemIcon>
                    <MovieIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={show}
                  >
                  </ListItemText>
                </ListItem>
              )
            })}

            {char.tvShows.length > 0 && <Typography variant="h6" mt={2}>Programas de TV</Typography>}
            {char.tvShows.map((show) => {
              return (
                <ListItem key={show}>
                  <ListItemIcon>
                    <LiveTvIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={show}
                  >
                  </ListItemText>
                </ListItem>
              )
            })}

            {char.videoGames.length > 0 && <Typography variant="h6" mt={2}>Video Games</Typography>}
            {char.videoGames.map((show) => {
              return (
                <ListItem key={show}>
                  <ListItemIcon>
                    <SportsEsportsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={show}
                  >
                  </ListItemText>
                </ListItem>
              )
            })}

            {char.allies.length === 0 && char.enemies.length === 0 && char.films.length === 0 && char.parkAttractions.length === 0 && char.shortFilms.length === 0 && char.tvShows.length === 0 && char.videoGames.length === 0 ?
              <Box mt={2}>
                <Alert severity="info">Não há registros para esse personagem</Alert>
              </Box>
              : ''}
          </>
          : <SystemLoading />
        }
      </Box>
    </Modal>
  )
}

export default CustomModal