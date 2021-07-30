/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useMutation, gql } from '@apollo/client'
import SendIcon from '@material-ui/icons/Send'
import { IMessage } from '../../../../Interfaces/Workspace'
import useStyles from './CommentsStyle'

export interface CommentsInputProps {
  message: IMessage
  workspaceId: string
  feedId: string
}

const ADD_COMMENT = gql`
  mutation createCommentInMessage($input: InputComments!) {
    createCommentInMessage(input: $input) {
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
      assets {
        id
        assetName
      }
    }
  }
`

const CommentsInput: React.FC<CommentsInputProps> = ({
  message,
  workspaceId,
  feedId,
}) => {
  const classes = useStyles()
  const [userComment, setUserComment] = useState('')
  const [addComment] = useMutation(ADD_COMMENT)
  const onSubmit = () => {
    addComment({
      variables: {
        input: {
          parentWorkspaceId: workspaceId,
          // eslint-disable-next-line object-shorthand
          feedId: feedId,
          messageId: message.id,
          commentContent: userComment,
        },
      },
    })
  }

  const handleMessage = (text: string) => {
    setUserComment(text)
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }
  return (
    <div className={classes.form}>
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
        onChange={(e) => handleMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button>
        <SendIcon onClick={onSubmit} />
      </Button>
    </div>
  )
}

export default CommentsInput
