// eslint-disable

import React, { useEffect, useState, useContext } from 'react'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FcAssistant } from 'react-icons/fc'
import './Workspace.scss'
import { useQuery, gql } from '@apollo/client'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { iWorkspace } from '../../Interfaces/Workspace'
import { UserContext } from '../Context/UserContext'

const useStyles = makeStyles((theme) => ({
  container: { marginTop: theme.spacing(1) },
  link: {
    color: 'black',
    textDecoration: 'none',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '300px',
  },
}))

export const GET_WORKSPACES = gql`
  query allWorkspaces($input: InputWorkspaceGet!) {
    allWorkspaces(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
        messages {
          id
          content
          userId
          comments {
            id
            content
            userId
            createdAt
          }
        }
      }
      assets {
        id
        assetName
      }
      visio
    }
  }
`

const WorkspaceStudent: React.FC = () => {
  const { userInfos } = useContext(UserContext)

  const { loading, error, data } = useQuery(GET_WORKSPACES, {
    variables: {
      input: {
        isSchoolWorkspace: false,
        schoolId: '1',
      },
    },
  })
  const [workspace, setWorkspace] = useState([])
  const classes = useStyles()
  useEffect(() => {
    if (data) {
      setWorkspace(data.allWorkspaces)
    }
  }, [data])

  if (loading)
    return (
      <div className={classes.loader}>
        <Loader type="ThreeDots" color="#00BFFF" height={40} width={40} />
      </div>
    )

  if (error) {
    // TODO: Toast ou page type 404
  }

  return (
    <div className={classes.container}>
      {workspace ? (
        <div className="workspace_container">
          <div className="title_container">
            <FcAssistant className="workspace_icon" />
            <p>Espace de travail</p>
          </div>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            className="treeview"
          >
            {workspace.map((el: iWorkspace) => (
              <TreeItem
                className="title_channel_container"
                nodeId={el.id as string}
                label={el.title}
                key={el.id}
              >
                <Link
                  to={{
                    pathname: `/${el.id}`,
                    state: {
                      id: el.id,
                    },
                  }}
                  className={classes.link}
                >
                  <TreeItem
                    nodeId={el.feed[0].id as string}
                    label={el.feed[0].feedName}
                  />
                </Link>
                <TreeItem
                  nodeId={el.assets[0].id as string}
                  label={el.assets[0].name}
                />
                {el.visio ? (
                  <a href={el.visio}>
                    <TreeItem nodeId={el.visio as string} label="Visio" />
                  </a>
                ) : (
                  ''
                )}
              </TreeItem>
            ))}
          </TreeView>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default WorkspaceStudent
