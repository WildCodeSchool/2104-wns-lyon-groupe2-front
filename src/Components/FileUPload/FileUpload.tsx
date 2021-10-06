/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useMutation, gql } from '@apollo/client'

const UPLOAD_FILE = gql`
  mutation singleUpload($data: Upload!) {
    singleUpload(data: $data) {
      url
    }
  }
`

const FileUpload: React.FC = () => {
  const [singleUpload] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  })

  const handleFileChange = (e) => {
    const data = e.target.files[0]

    if (!data) return
    /* const reader = new FileReader()
    reader.addEventListener('load', () => {
      const data = reader.result
      singleUpload({ variables: { data } })
    })
    reader.readAsBinaryString(file) */
    singleUpload({ variables: { data } })
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
