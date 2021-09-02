import { useContext } from 'react'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import { Button, Typography } from '@material-ui/core'
import { IMessage } from '../../../Interfaces/Workspace'
import useStyles from './MessagesStyle'
import { UserContext } from '../../Context/UserContext'

export interface MessagesLikesProps {
  message: IMessage
}

const MessagesLikes: React.FC<MessagesLikesProps> = ({ message }) => {
  const { userInfos } = useContext(UserContext)
  const classes = useStyles()
  return (
    <div className={classes.icons}>
      <Button className={classes.icon}>
        <ThumbUpAltRoundedIcon style={{ color: '#3b3b3b' }} />
        <Typography className={classes.likes}>
          {message.likes ? message.likes.length : null}
        </Typography>
      </Button>
      <Button className={classes.icon}>
        <ThumbDownAltRoundedIcon style={{ color: '#3b3b3b' }} />
        <Typography className={classes.dislikes}>
          {message.dislikes ? message.dislikes.length : 0}
        </Typography>
      </Button>
    </div>
  )
}

export default MessagesLikes
