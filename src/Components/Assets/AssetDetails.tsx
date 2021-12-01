import { useEffect, useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import FileUpload from '../FileUPload/FileUpload'
import useStyles from './AssetDetailsStyle'
import { dateTransformator } from '../../Tools/date'

import { GET_FOLDER_DETAILS } from '../../graphql/queries'
import { IAssetsProps, IFolderDetails } from '../../Interfaces/Assets'

const AssetDetails: React.FC<any> = function ({ folderId }) {
  const classes = useStyles()

  const [folderDetails, setFolderDetails] = useState<IFolderDetails | null>(
    null,
  )

  const { loading, error, data, refetch } = useQuery(GET_FOLDER_DETAILS, {
    variables: {
      folderId,
    },
  })
  useEffect(() => {
    if (loading === false && data) {
      setFolderDetails(data.getFolderById)
    }
  })
  return (
    <div>
      {folderDetails && (
        <Container>
          <Typography className={classes.folderTitle}>
            {folderDetails.name}
          </Typography>
          <Typography className={classes.folderSubtitle}>
            {dateTransformator(new Date(+folderDetails.createdAt))}
          </Typography>
        </Container>
      )}
    </div>
  )
}

export default AssetDetails
