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
import useNickname from '../../../Hooks/useNickname'

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
    <div className={classes.icons}>
      <Button className={classes.icon} onClick={handleClickOpen}>
        <CommentIcon color="primary" style={{ color: '#3b3b3b' }} />
        <Typography className={classes.commentIcon}>
          {message.comments ? message.comments.length : null}
        </Typography>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
        className={classes.container}
      >
        <DialogTitle id="alert-dialog-title">
          <div className={classes.messageContainer}>
            <Paper className={classes.bubbleMessage}>
              <Grid className={classes.userNameContainer}>
                <div style={{ width: '50%', marginLeft: '20' }}>
                  <Avatar className={classes.nickName}>
                    {useNickname(message.userName)}
                  </Avatar>
                  <Typography className={classes.userName}>
                    {message.userName}
                  </Typography>
                </div>
                <div className={classes.date}>
                  {message.createdAt
                    ? new Date(parseInt(message.createdAt, 10)).toLocaleString()
                    : null}
                </div>
              </Grid>
              <div
                style={{
                  paddingBottom: '20px',
                }}
                className={classes.paperContainer}
              >
                <Typography className={classes.text}>
                  {message.content}
                </Typography>
              </div>
            </Paper>
            <div
              style={{
                border: '1px solid #b5b5b5',
                width: '90%',
                margin: '0 auto',
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={classes.commentsContainer}>
              {message.comments?.map((comment: IComment) => (
                <Grid ref={bottomRef}>
                  <Paper className={classes.bubble}>
                    <Grid className={classes.userNameContainer}>
                      <div style={{ width: '50%', marginLeft: '20' }}>
                        <Avatar className={classes.nickName}>
                          {useNickname(comment.userName)}
                        </Avatar>
                        <Typography className={classes.userName}>
                          {comment.userName}
                        </Typography>
                      </div>
                      <div className={classes.date}>
                        {comment.createdAt
                          ? new Date(
                              parseInt(comment.createdAt, 10),
                            ).toLocaleString()
                          : null}
                      </div>
                    </Grid>
                    <div
                      style={{
                        paddingBottom: '20px',
                      }}
                      className={classes.paperContainer}
                    >
                      <Typography className={classes.text}>
                        {comment.content}
                      </Typography>
                    </div>
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
