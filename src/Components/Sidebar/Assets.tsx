import React from 'react'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FcFolder, FcLike } from 'react-icons/fc'
import './Assets.scss'

const Assets: React.FC = () => {
  return (
    <div className="assets_container">
      <ul className="favorites">
        <FcLike className="favorite_icon" />
        <li>Favorites</li>
      </ul>
      <div className="title_container">
        <FcFolder className="assets_icon" />
        <p>Ressources</p>
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem
          className="title_channel_container"
          nodeId="2"
          label="TypeScript"
        >
          <TreeItem nodeId="3" label="Documents Vrac" />
          <TreeItem nodeId="4" label="Liens live-coding" />
          <TreeItem nodeId="5" label="liens visio" />
        </TreeItem>
        <TreeItem
          className="title_channel_container"
          nodeId="6"
          label="GraphQL"
        >
          <TreeItem nodeId="7" label="Documents Vrac" />
          <TreeItem nodeId="8" label="Liens live-coding" />
          <TreeItem nodeId="9" label="liens visio" />
        </TreeItem>
      </TreeView>
    </div>
  )
}

export default Assets
