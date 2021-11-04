import { Container, Typography } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import './DeleteUpload.scss'

const DeleteUpload: React.FC<any> = (props) => {
  const { rowsSelected } = props
  const handleDelete = () => {
    console.log(rowsSelected)
  }
  return (
    <Container className="delete_upload_container">
      <DeleteOutline onClick={handleDelete} />
    </Container>
  )
}

export default DeleteUpload
