import { useQuery } from '@apollo/client'
import {
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { GET_FOLDER_ASSETS } from '../../graphql/queries'
import useStyles from './AssetsListsStyle'
import { elipsMyText } from '../../Tools/dataRework'
import { IAssetsDetails, IAssetsProps } from '../../Interfaces/Assets'

// Ce composant a été fait avant le composant AssetTables
// A voir si encore utile mais je me dis qu'il peut servir
// de base si on veut une vue "icones" de l'interieur des dossiers.

const AssetsList: React.FC<IAssetsProps> = function ({ folderId }) {
  const classes = useStyles()
  const [checked, setChecked] = useState<number[]>([0])
  const [assetsList, setAssetsList] = useState<IAssetsDetails[] | null>(null)

  const { loading, error, data, refetch } = useQuery(GET_FOLDER_ASSETS, {
    variables: {
      folderId,
    },
  })
  useEffect(() => {
    if (loading === false && data) setAssetsList(data.getAssetsByFolderId)
  })
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <div>
      {assetsList && (
        <Container className={classes.mainContainer}>
          <List>
            {assetsList.map((asset) => {
              const labelId = `checkbox-list-label-${asset.id}`
              return (
                <ListItem
                  key={asset.id}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(asset.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(asset.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId}>
                    <Typography className={classes.assetText}>{`${elipsMyText(
                      asset.title,
                    )}`}</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <CloudDownloadIcon
                        fontSize="large"
                        className={classes.assetIcons}
                      />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <HighlightOffIcon
                        fontSize="large"
                        className={classes.assetIcons}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </Container>
      )}
    </div>
  )
}

export default AssetsList
