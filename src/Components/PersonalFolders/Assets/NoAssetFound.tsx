import { Container, Typography } from '@material-ui/core'
import './NoAssetFound.scss'

const NoAssetFound: React.FC = () => {
  return (
    <Container>
      <Typography className="test">No Files found...</Typography>
    </Container>
  )
}

export default NoAssetFound
