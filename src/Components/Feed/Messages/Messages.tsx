import { useState, useRef, useEffect } from 'react'
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  Avatar,
  Typography,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import useStyles from './MessagesStyle'

const Messages: React.FC = () => {
  const classes = useStyles()
  const [userMessage, setUserMessage] = useState('')
  const [messages, setMessages]: any = useState([
    {
      name: 'Thomas',
      message:
        'Thank you for using core-js for polyfilling JavaScript standard library!',
      like: 44,
      dislike: 1,
      comments: [],
    },
    {
      name: 'Thomas',
      message:
        'Chinchilla est un genre de mammifères rongeurs de la famille des Chinchillidae, communément appelés également Chinchillas. ce genre comprend deux espèces sauvages et une forme domestiquée, issue très probablement du croisement en élevage des deux premières. Les chinchillas sont des animaux nocturnes, de la taille d’un lapin nain.',
      like: 12,
      dislike: 2,
      comments: [],
    },
    {
      name: 'Thomas',
      message: "Tester c'est douter",
      like: 13,
      dislike: 1,
      comments: [],
    },
    {
      name: 'Thomas',
      message: 'Compiled with warnings = eslint-disable',
      like: 1326876,
      dislike: 0,
      comments: [],
    },
    {
      name: 'Thomas',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      like: 1,
      dislike: 0,
      comments: [],
    },
    {
      name: 'Thomas',
      message: "J'aime me beurrer la biscotte",
      like: 44,
      dislike: 2,
      comments: [],
    },
    {
      name: 'Thomas',
      message: 'Habile ...',
      like: 13,
      dislike: 4,
      comments: [],
    },
  ])
  const bottomRef: any = useRef()

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSubmit = () => {
    setMessages([
      ...messages,
      {
        name: 'Thomas',
        message: userMessage,
        like: 0,
        dislike: 0,
        comments: [],
      },
    ])
    scrollToBottom()
  }

  const handleMessage = (text: string) => {
    setUserMessage(text)
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div>
      <Grid item xs={12} className={classes.paper}>
        <div className={classes.messagesContainer}>
          {messages.map((el: any) => (
            <Grid
              key={el.message}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              ref={bottomRef}
            >
              <Paper className={classes.bubble}>
                <Grid
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className={classes.paperContainer}
                >
                  <Avatar className={classes.purple}>AB</Avatar>
                  <Typography className={classes.text}>{el.message}</Typography>
                </Grid>
                <div className={classes.icons}>
                  <div className={classes.icon}>
                    <ThumbUpAltRoundedIcon color="primary" />
                    <Typography style={{ fontSize: '12px' }}>
                      {el.like}
                    </Typography>
                  </div>
                  <div className={classes.icon}>
                    <ThumbDownAltRoundedIcon style={{ color: '#ab1620' }} />
                    <Typography style={{ fontSize: '12px' }}>
                      {el.dislike}
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
        </div>
        <Grid item xs={12} className={classes.form}>
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="messages"
            label="Ecrire sur le fil d'actualité"
            type="text"
            id="messages"
            onChange={(e) => handleMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button>
            <SendIcon className={classes.submit} onClick={onSubmit} />
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Messages
