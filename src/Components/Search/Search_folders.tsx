import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import FolderIcon from '@material-ui/icons/Folder'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  folders: {
    display: 'flex',
  },
  folder: {
    padding: '10px',
    textAlign: 'center',
  },
  folder_icon: {
    fontSize: '100px',
    width: '150px',
    height: '150px',
  },
}))

const SearchFolders: React.FC<any> = (props) => {
  const { folders } = props
  const history = useHistory()

  const classes = useStyles()

  console.log('🚀 ~ file: Search_folders.tsx ~ line 17 ~ folders', folders)

  return (
    <div className={classes.folders}>
      {folders &&
        folders.length > 0 &&
        folders.map((folder: any, i: any) => {
          return (
            <div className={classes.folder}>
              <FolderIcon
                style={{ color: '#F5A454' }}
                className={classes.folder_icon}
                // eslint-disable-next-line no-underscore-dangle
                onClick={() => history.push(`/personal-folders/${folder._id}`)}
              />
              <p>{folder.name}</p>
            </div>
          )
        })}
    </div>
  )
}

export default SearchFolders
