/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Box, Button, Container, Typography } from '@material-ui/core'

import { UPLOAD_FILE } from '../../graphql/mutations'
import { IAssetsProps } from '../../Interfaces/Assets'

const FileUpload: React.FC<IAssetsProps | null> = ({
  folderId,
  setUpdateComponent,
  updateComponent,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (result) => setUpdateComponent(!updateComponent),
  })

  const handleSendMyFile = async (e) => {
    const data = e.target.files[0]
    if (data.size > 2097152) {
      setErrorMessage(true)
    } else {
      await uploadFile({ variables: { data, folderId } })
      setIsModalOpen(!isModalOpen)
    }
  }

  return (
    <>
      <Container style={{ textAlign: 'center' }}>
        {' '}
        <label htmlFor="docUpload">
          <input
            style={{ display: 'none' }}
            id="docUpload"
            name="docUpload"
            type="file"
            onChange={handleSendMyFile}
            accept="image/*, .pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.ods"
          />

          <Button color="primary" variant="contained" component="span">
            Send my file
          </Button>
        </label>
        {errorMessage && (
          <Box style={{ margin: '20px 0 ' }}>
            <Typography style={{ color: 'red' }}>
              Your file is to heavy, please send me something lighter...{' '}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  )
}
export default FileUpload
