import { GridToolbarContainer } from '@material-ui/data-grid'
import DeleteUpload from './DeleteUpload'

const CustomToolbar: React.FC<any> = (props) => {
  const { rowsSelected } = props
  return (
    <GridToolbarContainer>
      {rowsSelected.length && <DeleteUpload rowsSelected={rowsSelected} />}
    </GridToolbarContainer>
  )
}

export default CustomToolbar
