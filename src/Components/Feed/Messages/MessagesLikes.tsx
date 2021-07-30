import { useContext } from 'react'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import { Typography } from '@material-ui/core'
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
      <div className={classes.icon}>
        <ThumbUpAltRoundedIcon color="primary" />
        <Typography className={classes.likes}>
          {message.likes ? message.likes.length : null}
        </Typography>
      </div>
      <div className={classes.icon}>
        <ThumbDownAltRoundedIcon style={{ color: '#ab1620' }} />
        <Typography className={classes.dislikes}>
          {message.dislikes ? message.dislikes.length : 0}
        </Typography>
      </div>
    </div>
  )
}

export default MessagesLikes
