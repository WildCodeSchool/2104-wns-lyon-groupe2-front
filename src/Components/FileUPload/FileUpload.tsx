/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { UPLOAD_FILE } from '../../graphql/mutations'
import { iAssetsProps } from '../Assets/AssetDetails'

const FileUpload: React.FC<iAssetsProps | null> = (props: any) => {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  })
  const { folderId } = props

  const [data, setData] = useState(folderId)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setData(file)
  }
  const handlesubmit = async () => {
    await uploadFile({ variables: { data, folderId } })
  }

  return (
    <>
      <form>
        <input type="file" name="docUpload" onChange={handleFileChange} />
        <input type="button" value="send" onClick={() => handlesubmit()} />
      </form>
    </>
  )
}
export default FileUpload
