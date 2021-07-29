import React from 'react'
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

export interface CommentsProps {
  message: IMessage
}

const Comments: React.FC<CommentsProps> = ({ message }) => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  console.log(message)

  return (
    <div>
      <CommentIcon
        color="primary"
        onClick={handleClickOpen}
        style={{ color: '#508c63', marginRight: 5 }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{message.content}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={classes.commentsContainer}>
              {message.comments?.map((comment: IComment) => (
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
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <form className={classes.form}>
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
            //   onChange={(e) => handleMessage(e.target.value)}
            //   onKeyPress={handleKeyPress}
          />
        </form>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Quitter
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Comments
