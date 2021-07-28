import * as React from 'react'
import { useState, useEffect } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { iFeed } from '../../../Interfaces/Workspace'
import useStyles from './MessagesStyle'

export interface MessagesInputProps {
  messages: iFeed[]
  setMessages: any
  bottomRef: any
}

const MessagesInput: React.FC<MessagesInputProps> = ({
  messages,
  setMessages,
  bottomRef,
}: MessagesInputProps) => {
  const [userMessage, setUserMessage] = useState('')
  const classes = useStyles()

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
  )
}

export default MessagesInput
