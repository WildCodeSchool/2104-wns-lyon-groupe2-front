import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Modal } from '@material-ui/core'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import { BsChevronRight, BsChevronDown } from 'react-icons/bs'
import { useQuery, useMutation } from '@apollo/client'
import { GET_FOLDERS_TREE } from '../../graphql/queries'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type TAddFolderProps = {
  open: boolean
  setOpen: any
}

const MoveFolderModal: React.FC<TAddFolderProps> = ({ open, setOpen }) => {
  const [foldersTree, setFoldersTree] = useState<any>(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { refetch, error, data, loading } = useQuery(GET_FOLDERS_TREE)

  useEffect(() => {
    if (data && data.getFoldersTree) {
      setFoldersTree(data.getFoldersTree)
    }
  }, [data])

  // eslint-disable-next-line consistent-return
  const returnTree: any = () => {
    if (foldersTree) {
      return (
        <TreeView
          defaultCollapseIcon={<BsChevronDown />}
          defaultExpandIcon={<BsChevronRight />}
        >
          {foldersTree.map((folder) => {
            // eslint-disable-next-line react/self-closing-comp
            return <TreeItem nodeId={folder.id} label={folder.name}></TreeItem>
          })}
        </TreeView>
      )
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {returnTree()}
          {/* <TreeItem nodeId="1" label="Applications">
              <TreeItem nodeId="2" label="Calendar" />
            </TreeItem>
            <TreeItem nodeId="5" label="Documents">
              <TreeItem nodeId="10" label="OSS" />
              <TreeItem nodeId="6" label="MUI">
                <TreeItem nodeId="8" label="index.js" />
              </TreeItem>
            </TreeItem> */}
        </Box>
      </Modal>
    </div>
  )
}

export default MoveFolderModal
