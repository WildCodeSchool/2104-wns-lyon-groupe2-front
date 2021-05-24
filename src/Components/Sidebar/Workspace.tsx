import React from 'react'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FcGraduationCap, FcAssistant } from 'react-icons/fc'
import './Workspace.scss'

const Workspace: React.FC = () => {
  return (
    <div className="workspace_container">
      <div className="title_container">
        <FcGraduationCap className="workspace_icon" />
        <p>Ecoles/Formations</p>
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className="treeview"
      >
        <TreeItem
          className="title_channel_container"
          nodeId="2"
          label="General"
        >
          <TreeItem nodeId="3" label="feed" />
          <TreeItem nodeId="4" label="ressources" />
          <TreeItem nodeId="5" label="liens visio" />
        </TreeItem>
        <TreeItem
          style={{ marginBottom: '20px' }}
          nodeId="6"
          label="Alternance"
          className="title_channel_container"
        >
          <TreeItem nodeId="7" label="feed" />
          <TreeItem nodeId="8" label="ressources" />
          <TreeItem nodeId="9" label="liens visio" />
        </TreeItem>
      </TreeView>
      <div className="title_container">
        <FcAssistant className="workspace_icon" />
        <p>Espace de travail</p>
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className="treeview"
      >
        <TreeItem
          className="title_channel_container"
          nodeId="11"
          label="General"
        >
          <TreeItem nodeId="12" label="feed" />
          <TreeItem nodeId="13" label="ressources" />
          <TreeItem nodeId="14" label="liens visio" />
        </TreeItem>
        <TreeItem
          className="title_channel_container"
          nodeId="15"
          label="Alternance"
        >
          <TreeItem nodeId="16" label="feed" />
          <TreeItem nodeId="17" label="ressources" />
          <TreeItem nodeId="18" label="liens visio" />
        </TreeItem>
      </TreeView>
    </div>
  )
}

export default Workspace
