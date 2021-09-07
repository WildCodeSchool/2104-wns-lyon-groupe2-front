/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useContext } from 'react'
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  StylesProvider,
} from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import useStyles from './MessagesStyle'
import MessagesInput from './MessagesInput'
import { iFeed, IMessage } from '../../../Interfaces/Workspace'
import { SidebarContext } from '../../Context/SidebarContext'
import MessagesLikes from './MessagesLikes'
import Comments from './Comments/Comments'
import MessagesDislikes from './MessagesDislikes'

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
          userName
          comments {
            id
            content
            userId
            userName
          }
          likes {
            userId
            userName
          }
          dislikes {
            userId
            userName
          }
        }
      }
    }
  }
`

const Messages: React.FC = () => {
  const classes = useStyles()
  const [messages, setMessages] = useState<iFeed[]>([])
  const [userMessage, setUserMessage] = useState('')
  const [feedId, setFeedId] = useState<string>('')
  const [refresh, setRefresh] = useState<boolean>(false)
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
  const { loading, error, data, refetch } = useQuery(GET_WORKSPACES, {
    variables: {
      input: {
        id: params ? params.id : firstFeedOnHomePage,
      },
    },
  })
  useEffect(() => {
    if (data) {
      setUserMessage('')
      setMessages(data.getWorkspaceById.feed[0].messages)
      setFeedId(data.getWorkspaceById.feed[0].id)
    }
    if (bottomRef.current) {
      scrollToBottom(bottomRef)
    }
    setRefresh(false)
  }, [data, bottomRef.current, messages, refresh])
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
        {messages.length > 0 ? (
          <div className={classes.messagesContainer}>
            {messages.map((el: IMessage) => (
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
                  <Grid className={classes.userNameContainer}>
                    <Avatar className={classes.purple}>
                      {el.userName &&
                        el.userName.split(' ')[0].slice(0, 1).toUpperCase() +
                          el.userName.split(' ')[1].slice(0, 1).toUpperCase()}
                    </Avatar>
                    <Typography className={classes.userName}>
                      {el.userName}
                    </Typography>
                  </Grid>
                  <Grid className={classes.paperContainer}>
                    <Typography className={classes.text}>
                      {el.content}
                    </Typography>
                  </Grid>
                  <Grid className={classes.iconsContainer}>
                    <Comments
                      message={el}
                      workspaceId={params ? params.id : firstFeedOnHomePage}
                      feedId={feedId}
                    />
                    <MessagesLikes
                      message={el}
                      workspaceId={params ? params.id : firstFeedOnHomePage}
                      feedId={feedId}
                      refetch={refetch}
                    />
                    <MessagesDislikes
                      message={el}
                      workspaceId={params ? params.id : firstFeedOnHomePage}
                      feedId={feedId}
                      refetch={refetch}
                    />
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </div>
        ) : (
          <i className={classes.notMessages}>
            Soyez le premier à écrire sur ce channel
          </i>
        )}

        <MessagesInput
          bottomRef={bottomRef}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          workspaceId={params ? params.id : firstFeedOnHomePage}
          feedId={feedId}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Grid>
    </div>
  )
}

export default Messages
