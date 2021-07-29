import { useState, useRef, useEffect, useContext } from 'react'
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  Avatar,
  Typography,
} from '@material-ui/core'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import { useQuery, gql } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import useStyles from './MessagesStyle'
import MessagesInput from './MessagesInput'
import { iFeed } from '../../../Interfaces/Workspace'
import { SidebarContext } from '../../Context/SidebarContext'

const GET_WORKSPACES = gql`
  query getWorkspaceById($input: WorkspaceId!) {
    getWorkspaceById(input: $input) {
      id
      title
      schoolId
      feed {
        id
        feedName
        messages {
          id
          content
          userId
        }
      }
    }
  }
`

const Messages: React.FC = () => {
  const classes = useStyles()
  const [messages, setMessages] = useState<iFeed[]>([])
  const [feedId, setFeedId] = useState<string>('')
  const { firstFeedOnHomePage } = useContext(SidebarContext)
  const location = useLocation()
  const bottomRef: any = useRef()
  const params: any = location.state

  const scrollToBottom = (node: any) => {
    if (messages.length >= 4 && node !== null) {
      node?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }
  const { loading, error, data } = useQuery(GET_WORKSPACES, {
    variables: {
      input: {
        id: params ? params.id : firstFeedOnHomePage,
      },
    },
  })
  useEffect(() => {
    if (data) {
      setMessages(data.getWorkspaceById.feed[0].messages)
      setFeedId(data.getWorkspaceById.feed[0].id)
    }
    if (bottomRef.current) {
      scrollToBottom(bottomRef)
    }
  }, [data, messages, bottomRef.current])

  if (loading)
    return (
      <div className={classes.loader}>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    )

  if (error) {
    // TODO: Toast ou page type 404
  }

  return (
    <div>
      <Grid item xs={12} className={classes.paper}>
        <div className={classes.messagesContainer}>
          {messages.map((el: iFeed) => (
            <Grid
              key={el.id}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              ref={bottomRef}
            >
              <Paper className={classes.bubble}>
                <Grid
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className={classes.paperContainer}
                >
                  <Avatar className={classes.purple}>AB</Avatar>
                  <Typography className={classes.text}>{el.content}</Typography>
                </Grid>
                <div className={classes.icons}>
                  <div className={classes.icon}>
                    <ThumbUpAltRoundedIcon color="primary" />
                    <Typography className={classes.likes}>
                      {el.likes ? el.likes.length : null}
                    </Typography>
                  </div>
                  <div className={classes.icon}>
                    <ThumbDownAltRoundedIcon style={{ color: '#ab1620' }} />
                    <Typography className={classes.dislikes}>
                      {el.dislikes ? el.dislikes.length : null}
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
        </div>
        <MessagesInput
          bottomRef={bottomRef}
          messages={messages}
          setMessages={setMessages}
          workspaceId={params ? params.id : firstFeedOnHomePage}
          feedId={feedId}
        />
      </Grid>
    </div>
  )
}

export default Messages
