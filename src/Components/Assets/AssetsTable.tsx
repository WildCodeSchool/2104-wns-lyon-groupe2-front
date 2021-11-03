import { DataGrid, GridColDef, GridRowProps } from '@material-ui/data-grid'

import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { GET_FOLDER_ASSETS } from '../../graphql/queries'
import AssetDetails, { IAssetsProps } from './AssetDetails'
import { dataForAssetsTable } from '../../Tools/dataRework'
import useStyles from './AssetsTableStyle'

interface IAssetsDetails {
  title: string
  createdAt: string
  url: string
  id: number
}

const AssetsTable: React.FC<IAssetsProps> = ({ folderId }) => {
  const classes = useStyles()
  const [assetsList, setAssetsList] = useState<IAssetsDetails[] | null>(null)
  const [rows, setRows] = useState([])
  const { loading, error, data, refetch } = useQuery(GET_FOLDER_ASSETS, {
    variables: {
      folderId,
    },
  })
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'title', headerName: 'Nom', width: 150 },
    { field: 'createdAt', headerName: 'Créer le', width: 150 },
    { field: 'updatedAt', headerName: 'Last Modification', width: 180 },
    { field: 'likes', headerName: 'Likes', width: 120 },
    { field: 'type', headerName: 'Format', width: 140 },
  ]

  useEffect(() => {
    if (loading === false && data) setAssetsList(data.getAssetsByFolderId)
    if (assetsList) {
      setRows(dataForAssetsTable(assetsList))
    }
  }, [folderId])

  return (
    <>
      <div style={{ height: 300 }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>
    </>
  )
}

export default AssetsTable
