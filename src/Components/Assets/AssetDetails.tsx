import { Container } from '@material-ui/core'
import FileUpload from '../FileUPload/FileUpload'

export interface iAssetsProps {
  folderId: string
}

const AssetDetails: React.FC<iAssetsProps> = ({ folderId }) => {
  console.log('folder', folderId)

  return (
    <>
      <Container>
        <FileUpload folderId={folderId} />
      </Container>
    </>
  )
}

export default AssetDetails
