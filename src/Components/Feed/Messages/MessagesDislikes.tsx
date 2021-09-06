import { useContext } from 'react'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import { Button, Typography } from '@material-ui/core'
import { useMutation, gql } from '@apollo/client'
import { IMessage } from '../../../Interfaces/Workspace'
import useStyles from './MessagesStyle'
import { UserContext } from '../../Context/UserContext'

const ADD_DISLIKE = gql`
  mutation addDislikeToMessage($input: DisLikeMessage!) {
    addLikeToMessage(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
        messages {
          id
          content
          comments {
            id
            content
          }
        }
      }
    }
  }
`
export interface MessagesLikesProps {
  message: IMessage
  workspaceId: string
  feedId: string
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const MessagesDislikes: React.FC<MessagesLikesProps> = ({
  message,
  workspaceId,
  feedId,
  setRefresh,
}) => {
  const [addDislike] = useMutation(ADD_DISLIKE)
  const addDislikes = () => {
    setRefresh(true)
    addDislike({
      variables: {
        input: {
          parentWorkspaceId: workspaceId,
          // eslint-disable-next-line object-shorthand
          feedId: feedId,
          messageId: message.id,
        },
      },
    })
  }
  const { userInfos } = useContext(UserContext)
  const classes = useStyles()
  return (
    <div className={classes.icons}>
      <Button className={classes.icon}>
        <ThumbDownAltRoundedIcon style={{ color: '#3b3b3b' }} />
        <Typography className={classes.dislikes}>
          {message.dislikes ? message.dislikes.length : 0}
        </Typography>
      </Button>
    </div>
  )
}

export default MessagesDislikes
