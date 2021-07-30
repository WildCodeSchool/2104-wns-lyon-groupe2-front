/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CommentIcon from '@material-ui/icons/Comment'

import { Grid, TextField, Typography, Avatar, Paper } from '@material-ui/core'
import { IComment, IMessage } from '../../../../Interfaces/Workspace'
import useStyles from './CommentsStyle'
import CommentsInput from './CommentsInput'
import Messages from '../Messages'

export interface CommentsProps {
  message: IMessage
  workspaceId: string
  feedId: string
}

const Comments: React.FC<CommentsProps> = ({
  message,
  workspaceId,
  feedId,
}) => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const bottomRef: any = useRef()
  // TODO: fix scroll in dialog
  const scrollToBottom = (node: any) => {
    if (node !== null) {
      node?.current.scrollIntoView(false, {
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }

  useEffect(() => {
    if (bottomRef.current) {
      scrollToBottom(bottomRef)
    }
  }, [bottomRef.current])

  return (
    <div>
      <div className={classes.icon}>
        <CommentIcon
          color="primary"
          onClick={handleClickOpen}
          style={{ color: '#508c63', marginRight: 1 }}
        />
        <Typography className={classes.commentIcon}>
          {message.comments ? message.comments.length : null}
        </Typography>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
        className={classes.container}
      >
        <DialogTitle id="alert-dialog-title">{message.content}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={classes.commentsContainer}>
              {message.comments?.map((comment: IComment) => (
                <Grid ref={bottomRef}>
                  <Paper className={classes.bubble}>
                    <Grid
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      className={classes.paperContainer}
                    >
                      <Avatar className={classes.purple}>AB</Avatar>
                      <Typography className={classes.text}>
                        {comment.content}
                      </Typography>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <CommentsInput
          message={message}
          workspaceId={workspaceId}
          feedId={feedId}
        />
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Quitter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Comments
