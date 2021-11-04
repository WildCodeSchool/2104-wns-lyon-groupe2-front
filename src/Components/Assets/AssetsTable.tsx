import React, { useEffect, useState } from 'react'
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
} from '@material-ui/data-grid'

import { IGridProps } from '../../Interfaces/Assets'
import { dataForAssetsTable } from '../../Tools/dataRework'
import NoAssetFound from './NoAssetFound'
import CustomToolbar from './CustomToolbar'

const AssetsTable: React.FC<IGridProps> = ({ assetsList }) => {
  const [rows, setRows] = useState([])
  const [rowsSelected, setRowsSelected] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Nom', width: 150 },
    { field: 'createdAt', headerName: 'Créer le', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modification', width: 180 },
    { field: 'likes', headerName: 'Likes', width: 120 },
    { field: 'type', headerName: 'Format', width: 140 },
  ]
  useEffect(() => {
    if (assetsList) {
      setRows(dataForAssetsTable(assetsList))
    }
  }, [assetsList])
  console.log(rows)
  return (
    <>
      {rows.length ? (
        <div style={{ height: 300 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setRowsSelected(newSelectionModel)
            }}
            components={{ Toolbar: CustomToolbar }}
            componentsProps={{ toolbar: { rowsSelected } }}
          />
        </div>
      ) : (
        <NoAssetFound />
      )}
    </>
  )
}

export default AssetsTable
