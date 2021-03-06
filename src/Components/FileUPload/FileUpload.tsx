/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Container, IconButton } from '@material-ui/core'

import { UPLOAD_FILE } from '../../graphql/mutations'
import useStyles from './FileUPloadStyle'
import { IAssetsDetails, IAssetsProps } from '../../Interfaces/Assets'

const FileUpload: React.FC<IAssetsProps | null> = ({
  folderId,
  setUpdateComponent,
  updateComponent,
  isModalOpen,
  setIsModalOpen,
}) => {
  const classes = useStyles()

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (result) => setUpdateComponent(!updateComponent),
  })
  const [data, setFileData] = useState()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileData(file)
  }
  const handlesubmit = async () => {
    await uploadFile({ variables: { data, folderId } })
  }

  return (
    <>
      <Container className={classes.container}>
        <form>
          <input
            className="upload_button"
            type="file"
            name="docUpload"
            onChange={handleFileChange}
          />

          <input
            className="send_my_upload_button"
            type="button"
            value="send"
            onClick={() => handlesubmit()}
          />
        </form>
      </Container>
    </>
  )
}
export default FileUpload
