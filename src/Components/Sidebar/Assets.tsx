import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FolderIcon from '@material-ui/icons/Folder'
import './Assets.scss'

const Assets: React.FC = () => {
  return (
    <div className="assets_container">
      <div className="title_container">
        <FolderIcon className="assets_icon" />
        <p className="section_name">Ressources</p>
      </div>
      <div className="favorites">
        <FavoriteIcon className="favorite_icon" />
        <p className="section_name">Favoris</p>
      </div>
    </div>
  )
}

export default Assets
