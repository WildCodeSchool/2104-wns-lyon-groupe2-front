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
import SchoolIcon from '@material-ui/icons/School'
import WorkspaceStudent from './WorkspaceStudent'
import { iWorkspace } from '../../Interfaces/Workspace'
import { SidebarContext } from '../Context/SidebarContext'
import { UserContext } from '../Context/UserContext'
import { GET_WORKSPACES } from '../../graphql/queries'

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
        <SchoolIcon className="workspace_icon" />
        <p className="section_name">Ecoles/Formations</p>
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
                label={el.assets[0].assetName}
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
