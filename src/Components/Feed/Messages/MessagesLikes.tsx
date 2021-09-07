import { useCallback, useContext } from 'react'
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
  refetch: any
}

const ADD_LIKE = gql`
  mutation addLikeToMessage($input: InputLikeMessage!) {
    addLikeToMessage(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
        messages {
          id
          likes {
            userId
          }
          id
          content
          comments {
            id
            content
          }
        }
      }
      assets {
        id
        assetName
      }
    }
  }
`

const MessagesLikes: React.FC<MessagesLikesProps> = ({
  message,
  workspaceId,
  feedId,
  refetch,
}) => {
  const [addLike] = useMutation(ADD_LIKE)
  const addLikes = async () => {
    await addLike({
      variables: {
        input: {
          parentWorkspaceId: workspaceId,
          // eslint-disable-next-line object-shorthand
          feedId: feedId,
          messageId: message.id,
        },
      },
    })
    await refetch()
  }
  const classes = useStyles()
  return (
    <div className={classes.icons}>
      <Button className={classes.icon}>
        <ThumbUpAltRoundedIcon
          style={{ color: '#3b3b3b' }}
          onClick={() => addLikes()}
        />
        <Typography className={classes.likes}>
          {message.likes ? message.likes.length : null}
        </Typography>
      </Button>
    </div>
  )
}

export default MessagesLikes
