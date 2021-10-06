import { useContext, useState, useEffect } from 'react'
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

const ADD_DISLIKE = gql`
  mutation addDislikeToMessage($input: InputDislikeMessage!) {
    addDislikeToMessage(input: $input) {
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

const MessagesDislikes: React.FC<MessagesLikesProps> = ({
  message,
  workspaceId,
  feedId,
  refetch,
}) => {
  const { userInfos } = useContext(UserContext)
  const [active, setActive] = useState(false)
  const [addDislike] = useMutation(ADD_DISLIKE)
  const addDislikes = async () => {
    await addDislike({
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
    if (message.dislikes) {
      for (let i = 0; i < message.dislikes.length; i += 1) {
        if (message.dislikes[i].userId === userInfos.userId) {
          setActive(true)
        }
      }
    }
  }, [message])

  const classes = useStyles()
  return (
    <div className={classes.icons}>
      <Button className={classes.icon} onClick={() => addDislikes()}>
        <ThumbDownAltRoundedIcon
          style={active ? { color: 'red' } : { color: '#3b3b3b' }}
        />
        <Typography className={classes.dislikes}>
          {message.dislikes ? message.dislikes.length : null}
        </Typography>
      </Button>
    </div>
  )
}

export default MessagesDislikes
