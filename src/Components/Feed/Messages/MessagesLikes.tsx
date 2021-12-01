import { useContext, useState, useEffect } from 'react'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
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

const MessagesLikes: React.FC<MessagesLikesProps> = function ({
  message,
  workspaceId,
  feedId,
  refetch,
}) {
  const { userInfos } = useContext(UserContext)
  const [active, setActive] = useState(false)
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

    setActive(!active)
    await refetch()
  }
  useEffect(() => {
    if (message.likes) {
      setActive(false)
      for (let i = 0; i < message.likes.length; i += 1) {
        if (message.likes[i].userId === userInfos.userId) {
          setActive(true)
        }
      }
    }
  }, [message, active])

  const classes = useStyles()
  return (
    <div className={classes.icons}>
      <Button onClick={() => addLikes()} style={{ minWidth: 0 }}>
        <ThumbUpAltRoundedIcon
          className={classes.icon}
          style={active ? { color: 'green' } : { color: '	#696969' }}
        />
        <Typography className={classes.likes}>
          {message.likes ? message.likes.length : null}
        </Typography>
      </Button>
    </div>
  )
}

export default MessagesLikes
