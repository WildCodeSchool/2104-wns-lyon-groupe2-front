import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@material-ui/data-grid'

import { IAssetsDetails, IGridProps } from '../../../Interfaces/Assets'
import { dataForAssetsTable } from '../../../Tools/dataRework'
import NoAssetFound from './NoAssetFound'
import CustomToolbar from './CustomToolbar'

const AssetsTable: React.FC<IGridProps> = ({
  assetsList,
  updateComponent,
  setUpdateComponent,
}) => {
  const [rows, setRows] = useState<IAssetsDetails[]>([])
  const [rowsSelected, setRowsSelected] = useState<any>([])

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
  return (
    <>
      {rows.length ? (
        <div style={{ height: 300 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIds = new Set(ids)
              const selectRowsData = rows.filter((row) =>
                selectedIds.has(row.id),
              )
              setRowsSelected(selectRowsData)
            }}
            components={{ Toolbar: CustomToolbar }}
            componentsProps={{
              toolbar: {
                assetsList: rowsSelected,
                updateComponent,
                setUpdateComponent,
              },
            }}
          />
        </div>
      ) : (
        <NoAssetFound />
      )}
    </>
  )
}

export default AssetsTable
