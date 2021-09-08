import { useContext } from 'react'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import { Button, Typography } from '@material-ui/core'
import { useMutation, gql } from '@apollo/client'
import { IMessage } from '../../../Interfaces/Workspace'
import useStyles from './MessagesStyle'
import { UserContext } from '../../Context/UserContext'

export interface MessagesLikesProps {
  message: IMessage
  workspaceId: string
  feedId: string
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const ADD_LIKE = gql`
  mutation addLikeToMessage($input: LikeMessage!) {
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

const MessagesLikes: React.FC<MessagesLikesProps> = ({
  message,
  workspaceId,
  feedId,
  setRefresh,
}) => {
  const [addLike] = useMutation(ADD_LIKE)
  const addLikes = () => {
    setRefresh(true)
    addLike({
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
        <ThumbUpAltRoundedIcon
          style={{ color: '#3b3b3b' }}
          onClick={() => addLike()}
        />
        <Typography className={classes.likes}>
          {message.likes ? message.likes.length : null}
        </Typography>
      </Button>
    </div>
  )
}

export default MessagesLikes
