import { GridToolbarContainer } from '@material-ui/data-grid'
import { IGridProps } from '../../../Interfaces/Assets'
import GridToolbarEvent from './GridToolbarEvent'

const CustomToolbar: React.FC<IGridProps> = (props) => {
  const { assetsList, updateComponent, setUpdateComponent } = props
  return (
    <GridToolbarContainer>
      {assetsList.length && (
        <GridToolbarEvent
          assetsList={assetsList}
          updateComponent={updateComponent}
          setUpdateComponent={setUpdateComponent}
        />
      )}
    </GridToolbarContainer>
  )
}

export default CustomToolbar
