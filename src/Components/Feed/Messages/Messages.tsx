/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useContext } from 'react'
import { Grid, Paper, Avatar, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Card from '@material-ui/core/Card'
import useStyles from './MessagesStyle'
import MessagesInput from './MessagesInput'
import { IMessage } from '../../../Interfaces/Workspace'
import { SidebarContext } from '../../Context/SidebarContext'
import MessagesLikes from './MessagesLikes'
import Comments from './Comments/Comments'
import MessagesDislikes from './MessagesDislikes'
import useNickname from '../../Hooks/useNickname'
import { GET_WORKSPACE_BY_ID } from '../../../graphql/queries'
import { UserContext } from '../../Context/UserContext'

const Messages: React.FC = () => {
  const classes = useStyles()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [userMessage, setUserMessage] = useState('')
  const [feedId, setFeedId] = useState<string>('')
  const [refresh, setRefresh] = useState<boolean>(false)
  const { userInfos } = useContext(UserContext)

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

  const { loading, error, data, refetch } = useQuery(GET_WORKSPACE_BY_ID, {
    variables: {
      input: {
        id: params ? params.id : firstFeedOnHomePage,
      },
    },
    pollInterval: 10000,
  })

  useEffect(() => {
    if (loading === false && data) {
      setUserMessage('')
      setMessages(data.getWorkspaceById.feed[0].messages)
      setFeedId(data.getWorkspaceById.feed[0].id)
    }
    if (bottomRef.current) {
      scrollToBottom(bottomRef)
    }
    setRefresh(false)
  }, [data, bottomRef.current, messages, refresh])

  const history = useHistory()

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
      <Card className={classes.paper} style={{ backgroundColor: 'whitesmoke' }}>
        {messages.length > 0 ? (
          <div className={classes.messagesContainer}>
            {messages.map((message: IMessage) => (
              <Grid key={message.id} ref={bottomRef}>
                <Paper className={classes.bubble}>
                  <Grid className={classes.userNameContainer}>
                    <div
                      onClick={() => {
                        history.push(`profile/${message.userId}`)
                      }}
                      style={{ width: '50%', marginLeft: '20' }}
                    >
                      <Avatar
                        src={userInfos.avatarUrl}
                        style={{ backgroundColor: message.color }}
                        className={classes.nickName}
                      >
                        {useNickname(message.userName)}
                      </Avatar>
                      <Typography className={classes.userName}>
                        {message.userName}
                      </Typography>
                    </div>
                    <div className={classes.date}>
                      {message.createdAt
                        ? new Date(
                            parseInt(message.createdAt, 10),
                          ).toLocaleString()
                        : null}
                    </div>
                  </Grid>
                  <Grid className={classes.paperContainer}>
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
          refetch={refetch}
        />
      </Card>
    </div>
  )
}

export default Messages
