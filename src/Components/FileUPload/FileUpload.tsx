/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { UPLOAD_FILE } from '../../graphql/mutations'

const FileUpload: React.FC = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  })

  const handleFileChange = (e) => {
    const data = e.target.files[0]
    if (!data) return
    uploadFile({ variables: { data } })
  }
  return (
    <>
      <div>
        <input type="file" name="testUpload" onChange={handleFileChange} />
      </div>
    </>
  )
}
export default FileUpload
