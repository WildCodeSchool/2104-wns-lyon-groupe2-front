import { useEffect, useState } from 'react'
import { Container, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import FileUpload from '../FileUPload/FileUpload'
import useStyles from './AssetDetailsStyle'

import { GET_FOLDER_DETAILS } from '../../graphql/queries'

export interface IAssetsProps {
  folderId: string
}
interface IFolderDetails {
  name: string
  createdAt: string
}

const AssetDetails: React.FC<IAssetsProps> = ({ folderId }) => {
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
  console.log(data)
  return (
    <>
      {folderDetails && (
        <Container>
          <Typography className={classes.folderTitle}>
            {folderDetails.name}
          </Typography>
          <Typography className={classes.folderSubtitle}>
            {folderDetails.createdAt}
          </Typography>
          <FileUpload folderId={folderId} />
        </Container>
      )}
    </>
  )
}

export default AssetDetails
