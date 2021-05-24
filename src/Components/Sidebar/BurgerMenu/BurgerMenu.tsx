import { slide as Menu } from 'react-burger-menu'
import './BurgerMenu.scss'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FcGraduationCap, FcAssistant, FcFolder, FcLike } from 'react-icons/fc'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  title: {
    marginLeft: '30px',
    '& .MuiTypography-body1': {
      fontSize: '20px',
    },
  },
})

const BurgerMenu: React.FC = () => {
  const classes = useStyles()

  return (
    <Menu width="100%">
      <div className="title_container">
        <FcGraduationCap className="workspace_icon" />
        <h3>Ecoles/Formations</h3>
      </div>
      <TreeView
        className="treeview"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem className={classes.title} nodeId="2" label="General">
          <TreeItem nodeId="3" label="feed" />
          <TreeItem nodeId="4" label="ressources" />
          <TreeItem nodeId="5" label="liens visio" />
        </TreeItem>
        <TreeItem
          style={{ marginBottom: '20px' }}
          nodeId="6"
          label="Alternance"
          className={classes.title}
        >
          <TreeItem nodeId="7" label="feed" />
          <TreeItem nodeId="8" label="ressources" />
          <TreeItem nodeId="9" label="liens visio" />
        </TreeItem>
      </TreeView>
      <div className="title_container">
        <FcAssistant className="workspace_icon" />
        <h3>Espace de travail</h3>
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className="treeview"
      >
        <TreeItem className={classes.title} nodeId="11" label="General">
          <TreeItem nodeId="12" label="feed" />
          <TreeItem nodeId="13" label="ressources" />
          <TreeItem nodeId="14" label="liens visio" />
        </TreeItem>
        <TreeItem
          className={classes.title}
          nodeId="15"
          label="Alternance"
          style={{ marginBottom: '20px' }}
        >
          <TreeItem nodeId="16" label="feed" />
          <TreeItem nodeId="17" label="ressources" />
          <TreeItem nodeId="18" label="liens visio" />
        </TreeItem>
      </TreeView>
      <div className="title_container">
        <FcFolder className="assets_icon" />
        <h3>Ressources</h3>
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className="treeview"
      >
        <TreeItem className={classes.title} nodeId="2" label="TypeScript">
          <TreeItem nodeId="3" label="Documents Vrac" />
          <TreeItem nodeId="4" label="Liens live-coding" />
          <TreeItem nodeId="5" label="liens visio" />
        </TreeItem>
        <TreeItem
          className={classes.title}
          nodeId="6"
          label="GraphQL"
          style={{ marginBottom: '20px' }}
        >
          <TreeItem nodeId="7" label="Documents Vrac" />
          <TreeItem nodeId="8" label="Liens live-coding" />
          <TreeItem nodeId="9" label="liens visio" />
        </TreeItem>
      </TreeView>
      <ul className="favorites">
        <FcLike className="favorite_icon" />
        <li style={{ listStyle: 'none' }}>
          <h3>Favorites</h3>
        </li>
      </ul>
    </Menu>
  )
}

export default BurgerMenu
