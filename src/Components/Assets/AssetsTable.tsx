import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@material-ui/data-grid'

import useStyles from './AssetsTableStyle'
import { IGridProps } from '../../Interfaces/Assets'
import { dataForAssetsTable } from '../../Tools/dataRework'
import NoAssetFound from './NoAssetFound'

const AssetsTable: React.FC<IGridProps> = ({ assetsList }) => {
  const classes = useStyles()
  const [rows, setRows] = useState([])

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Nom', width: 150 },
    { field: 'createdAt', headerName: 'Créer le', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modification', width: 180 },
    { field: 'likes', headerName: 'Likes', width: 120 },
    { field: 'type', headerName: 'Format', width: 140 },
    { field: 'params', headerName: '', width: 140 },
  ]
  useEffect(() => {
    if (assetsList) {
      setRows(dataForAssetsTable(assetsList))
    }
  }, [assetsList])
  return (
    <>
      {rows.length ? (
        <div style={{ height: 300 }}>
          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </div>
      ) : (
        <NoAssetFound />
      )}
    </>
  )
}

export default AssetsTable
