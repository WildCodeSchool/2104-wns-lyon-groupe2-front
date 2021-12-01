/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Box, Button, Container, Typography } from '@material-ui/core'

import { UPLOAD_FILE } from '../../graphql/mutations'
import { IAssetsProps, ITags } from '../../Interfaces/Assets'
import AutocompleteComponent from '../Autocomplete/Autocomplete'
import { GET_ALL_TAGS } from '../../graphql/queries'
import './FileUpload.scss'

const FileUpload: React.FC<IAssetsProps | null> = function ({
  folderId,
  setUpdateComponent,
  updateComponent,
  isModalOpen,
  setIsModalOpen,
}) {
  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  const [tagsSelected, setTagsSelected] = useState<ITags[] | []>([])

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (result) => setUpdateComponent(!updateComponent),
  })

  const handleSendMyFile = async (e) => {
    const data = e.target.files[0]
    if (data.size > 2097152) {
      setErrorMessage(true)
    } else {
      await uploadFile({
        variables: { data, folderId, tagsSelected },
      })
      setIsModalOpen(!isModalOpen)
    }
  }
  const { data } = useQuery(GET_ALL_TAGS)
  return (
    <div className="file_upload_container">
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
        <div className="file_upload_container_button">
          <Button color="primary" variant="contained" component="span">
            Send my file
          </Button>
        </div>
      </label>
      {errorMessage && (
        <Box style={{ margin: '20px 0 ' }}>
          <Typography style={{ color: 'red' }}>
            Your file is to heavy, please send me something lighter...{' '}
          </Typography>
        </Box>
      )}
      {data?.getAllTags?.length && (
        <div className="file_upload_container_tags">
          <AutocompleteComponent
            allTags={data.getAllTags}
            setTagsSelected={setTagsSelected}
          />
        </div>
      )}
    </div>
  )
}
export default FileUpload
