// eslint-disable

import React, { useEffect, useState, useContext } from 'react'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FcGraduationCap } from 'react-icons/fc'
import './Workspace.scss'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import WorkspaceStudent from './WorkspaceStudent'
import { iWorkspace } from '../../Interfaces/Workspace'
import { SidebarContext } from '../Context/SidebarContext'
import { UserContext } from '../Context/UserContext'

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'black',
    textDecoration: 'none',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
  },
}))

const GET_WORKSPACES = gql`
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

const WorkspaceSchool: React.FC = () => {
  const { setFirstFeedOnHomePage } = useContext(SidebarContext)
  const { userInfos } = useContext(UserContext)

  const { loading, error, data } = useQuery(GET_WORKSPACES, {
    variables: {
      input: {
        isSchoolWorkspace: true,
        schoolId: userInfos.schoolId,
      },
    },
  })
  const [workspace, setWorkspace] = useState([])
  const classes = useStyles()
  useEffect(() => {
    if (data?.allWorkspaces.length) {
      setWorkspace(data.allWorkspaces)
      setFirstFeedOnHomePage(data.allWorkspaces[0].id)
    }
  }, [data])

  // if (loading)
  //   return (
  //     <div className={classes.loader}>
  //       <CircularProgress />
  //     </div>
  //   )
  // if (error) return <p>Error :(</p>

  return (
    <div className="workspace_container">
      <div className="title_container">
        <FcGraduationCap className="workspace_icon" />
        <p>Ecoles/Formations</p>
      </div>
      <div>
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
      <WorkspaceStudent />
    </div>
  )
}

export default WorkspaceSchool
