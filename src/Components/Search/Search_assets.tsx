import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { iUsers } from '../../Interfaces/UsersInterfaces'
import AssetsTable from '../PersonalFolders/Assets/AssetsTable'
import { IGridProps } from '../../Interfaces/Assets'

const useStyles = makeStyles((theme) => ({
  assets: {
    width: '100%',
  },
}))

const SearchAssets: React.FC<any> = (props) => {
  const { assetsList } = props
  const [updateComponent, setUpdateComponent] = useState<boolean>(false)

  const classes = useStyles()

  // TODO : faire une fonction qui renvoie vers la ressource au clic d'une carte

  return (
    <div className={classes.assets}>
      <AssetsTable
        assetsList={assetsList}
        updateComponent={updateComponent}
        setUpdateComponent={setUpdateComponent}
      />
    </div>
  )
}

export default SearchAssets
