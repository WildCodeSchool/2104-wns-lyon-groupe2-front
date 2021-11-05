import { useState } from 'react'
import { Container } from '@material-ui/core'
import { DeleteOutline, Visibility } from '@material-ui/icons'
import { useMutation } from '@apollo/client'
import { IGridProps } from '../../../Interfaces/Assets'
import { DELETE_ASSETS } from '../../../graphql/mutations'
import './GridToolbarEvent.scss'
import DeleteModal from './DeleteModal'

const GridToolbarEvent: React.FC<IGridProps> = ({
  assetsList,
  updateComponent,
  setUpdateComponent,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [deleteAsset] = useMutation(DELETE_ASSETS, {
    onCompleted: () => setUpdateComponent(!updateComponent),
  })
  const handleDelete = () => {
    const idToDelete: string[] = []
    if (assetsList.length) {
      for (let i = 0; i < assetsList.length; i += 1) {
        idToDelete.push(assetsList[i].id.toString())
      }
      deleteAsset({ variables: { input: idToDelete } })
    }
  }
  const handleOpenFile = () => {
    const urlToOpen: string[] = []
    if (assetsList.length) {
      for (let i = 0; i < assetsList.length; i += 1) {
        urlToOpen.push(assetsList[i].url)
        window.open(assetsList[i].url, '_blank', i.toString())
      }
    }
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  return (
    <Container>
      <div className="upload_button_container">
        <div className="open">
          <Visibility onClick={handleOpenFile} />
        </div>
        <div className="delete">
          <DeleteOutline onClick={handleOpenModal} />
        </div>
      </div>
      {openModal && (
        <DeleteModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          confirmDelete={handleDelete}
        />
      )}
    </Container>
  )
}

export default GridToolbarEvent
