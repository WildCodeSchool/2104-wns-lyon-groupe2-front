/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useContext } from 'react'
import { Grid, Paper, Avatar, Typography } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import dayjs from 'dayjs'
import useStyles from './MessagesStyle'
import MessagesInput from './MessagesInput'
import { IMessage } from '../../../Interfaces/Workspace'
import { SidebarContext } from '../../Context/SidebarContext'
import MessagesLikes from './MessagesLikes'
import Comments from './Comments/Comments'
import MessagesDislikes from './MessagesDislikes'
import useNickname from '../../Hooks/useNickname'

export const GET_WORKSPACES = gql`
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
          color
          createdAt
          comments {
            id
            content
            userId
            userName
            color
            createdAt
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
  const [messages, setMessages] = useState<IMessage[]>([])
  const [messageHover, setMessageHover] = useState(null)
  const [userMessage, setUserMessage] = useState('')
  const [feedId, setFeedId] = useState<string>('')
  const [refresh, setRefresh] = useState<boolean>(false)
  const prevMessagesRef: any = useRef(null)
  const { firstFeedOnHomePage } = useContext(SidebarContext)
  const location = useLocation()
  const bottomRef: any = useRef(null)
  const params: any = location.state

  const scrollToBottom = (node: any) => {
    if (node !== null) {
      node?.current.scrollIntoView({
        // behavior: 'smooth',
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
    pollInterval: 10000,
  })

  useEffect(() => {
    prevMessagesRef.current = messages.length
  })

  const prevMessagesLength = prevMessagesRef.current

  useEffect(() => {
    if (loading === false && data) {
      setUserMessage('')
      setMessages(data.getWorkspaceById.feed[0].messages)
      setFeedId(data.getWorkspaceById.feed[0].id)
    }

    setRefresh(false)
  }, [data, bottomRef.current, messages, refresh])

  useEffect(() => {
    if (bottomRef.current && prevMessagesLength !== messages.length) {
      scrollToBottom(bottomRef)
    }
  }, [messages])

  const history = useHistory()

  const handleMessageHover = (messageId) => {
    setMessageHover(messageId)
  }

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
    <Grid item xs={12} className={classes.paper}>
      {messages.length > 0 ? (
        <div className={classes.messagesContainer}>
          {messages.map((message: IMessage, i) => (
            <Grid
              id={`message-${message.id}`}
              key={message.id}
              className={classes.message}
              onMouseEnter={() => handleMessageHover(message.id)}
              onMouseLeave={() => handleMessageHover(null)}
            >
              <Paper className={classes.bubble} elevation={0}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar
                    onClick={() => {
                      history.push(`profile/${message.userId}`)
                    }}
                    style={{ backgroundColor: message.color }}
                    className={classes.nickName}
                  >
                    {useNickname(message.userName)}
                  </Avatar>

                  <div style={{ width: '100%', position: 'relative' }}>
                    <Grid>
                      <Typography className={classes.userName}>
                        {message.userName}
                      </Typography>
                    </Grid>
                    <Grid className={classes.paperContainer}>
                      <div className={classes.date}>
                        {message.createdAt
                          ? dayjs(
                              new Date(
                                parseInt(message.createdAt, 10),
                              ).toLocaleString(),
                            ).format('DD/MM/YYYY - HH:mm')
                          : null}
                      </div>
                      <Typography className={classes.text}>
                        {message.content}
                      </Typography>
                    </Grid>

                    <Grid className={classes.iconsContainer}>
                      <Comments
                        message={message}
                        workspaceId={params ? params.id : firstFeedOnHomePage}
                        feedId={feedId}
                      />
                      <MessagesLikes
                        message={message}
                        workspaceId={params ? params.id : firstFeedOnHomePage}
                        feedId={feedId}
                        refetch={refetch}
                      />
                      <MessagesDislikes
                        message={message}
                        workspaceId={params ? params.id : firstFeedOnHomePage}
                        feedId={feedId}
                        refetch={refetch}
                      />
                    </Grid>
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
          <div ref={bottomRef} />
        </div>
      ) : (
        <>
          <i className={classes.notMessages}>
            Soyez le premier à écrire sur ce channel
          </i>
          <div style={{ flex: 1 }} />
        </>
      )}

      <MessagesInput
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        workspaceId={params ? params.id : firstFeedOnHomePage}
        feedId={feedId}
        refetch={refetch}
      />
    </Grid>
  )
}

export default Messages
