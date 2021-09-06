/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useMutation, gql } from '@apollo/client'
import { iFeed } from '../../../Interfaces/Workspace'
import useStyles from './MessagesStyle'

export interface MessagesInputProps {
  userMessage: string
  setUserMessage: (userMessage: string) => void
  bottomRef: any
  workspaceId: string
  feedId: string
  refresh: boolean
  setRefresh: (refresh: boolean) => void
}

const ADD_WORKSPACE = gql`
  mutation createMessageInFeed($input: InputMessages!) {
    createMessageInFeed(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
        messages {
          id
          content
        }
      }
      assets {
        id
        assetName
      }
    }
  }
`

const MessagesInput: React.FC<MessagesInputProps> = ({
  userMessage,
  setUserMessage,
  workspaceId,
  feedId,
  refresh,
  setRefresh,
}: MessagesInputProps) => {
  const classes = useStyles()
  const [addWorkspace] = useMutation(ADD_WORKSPACE)
  const onSubmit = () => {
    setRefresh(true)
    addWorkspace({
      variables: {
        input: {
          parentWorkspaceId: workspaceId,
          // eslint-disable-next-line object-shorthand
          feedId: feedId,
          messageContent: userMessage,
        },
      },
    })
  }

  const handleMessage = (text: string) => {
    setUserMessage(text)
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      setRefresh(true)
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
