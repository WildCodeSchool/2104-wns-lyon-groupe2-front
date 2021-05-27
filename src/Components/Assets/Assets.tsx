/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import {
  FileBrowser,
  FileContextMenu,
  FileList,
  FileNavbar,
  FileToolbar,
  ChonkyActions,
  FileActionHandler,
} from 'chonky'
import { useQuery, gql, DocumentNode } from '@apollo/client'

const Assets: React.FC = () => {
  const files: any[] = [
    null, // Loading animation will be shown for this file
    null,
    {
      id: 'nTe',
      name: 'Normal file.yml',
      size: 890,
      modDate: new Date('2012-01-01'),
    },
    {
      id: 'zxc',
      name: 'Hidden file.mp4',
      isHidden: true,
      size: 890,
    },
    {
      id: 'bnm',
      name: 'Normal folder',
      isDir: true,
      childrenCount: 12,
    },
    {
      id: 'vfr',
      name: 'Symlink folder',
      isDir: true,
      isSymlink: true,
      childrenCount: 0,
    },
    {
      id: '7zp',
      name: 'Encrypted file.7z',
      isEncrypted: true,
    },
    {
      id: 'qwe',
      name: 'Not selectable.tar.gz',
      ext: '.tar.gz', // Custom extension
      selectable: false, // Disable selection
      size: 54300000000,
      modDate: new Date(),
    },
    {
      id: 'rty',
      name: 'Not openable.pem',
      openable: false, // Prevent opening
      size: 100000000,
    },
    {
      id: 'btj',
      name: 'Not draggable.csv',
      draggable: false, // Prevent this files from being dragged
    },
    {
      id: 'upq',
      name: 'Not droppable',
      isDir: true,
      droppable: false, // Prevent files from being dropped into this folder
    },
    {
      id: 'mRw',
      name: 'Unknown file name',
    },
    {
      id: 'mEt',
      name: 'Custom icon & color',
      color: '#09f',
    },
  ]

  const folderChain = [
    { id: 'zxc', name: 'Home' },
    null, // Will show loading placeholder
    { id: 'fgh', name: 'My Documents' },
  ]

  const myFileActions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.DownloadFiles,
    ChonkyActions.DeleteFiles,
  ]

  const handleAction = React.useCallback<FileActionHandler>((data) => {
    console.log('File action data:', data)
  }, [])

  /* const handleAction: FileActionHandler = (data) => {
if (data.id === ChonkyActions.OpenFiles.id) {
// Open the files
} else if (data.id === ChonkyActions.DeleteFiles.id) {
// Delete the files
}
} */

  return (
    <div className="container_assets" style={{ height: 700 }}>
      <FileBrowser
        files={files}
        folderChain={folderChain}
        fileActions={myFileActions}
        onFileAction={handleAction}
      >
        <FileNavbar />
        <FileToolbar />
        <FileList />
        <FileContextMenu />
      </FileBrowser>
    </div>
  )
}

export default Assets
