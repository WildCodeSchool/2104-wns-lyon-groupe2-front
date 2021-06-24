// eslint-disable

import React, { useEffect, useState } from 'react'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FcGraduationCap, FcAssistant } from 'react-icons/fc'
import './Workspace.scss'
import { useQuery, gql } from '@apollo/client'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { iWorkspace } from '../../Interfaces/Workspace'

const useStyles = makeStyles((theme) => ({
  container: { marginTop: theme.spacing(1) },
  link: {
    color: 'black',
    textDecoration: 'none',
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
          likes
          dislikes
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

const WorkspaceCustom: React.FC = () => {
  const { loading, error, data } = useQuery(GET_WORKSPACES, {
    variables: {
      input: {
        isSchoolWorkspace: false,
        schoolId: '2',
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

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

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
              >
                <Link to={`/${el.id}`} className={classes.link}>
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
                    <TreeItem nodeId="5" label="Visio" />
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

export default WorkspaceCustom
