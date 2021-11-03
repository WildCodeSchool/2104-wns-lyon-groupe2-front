/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Container } from '@material-ui/core'
import { UPLOAD_FILE } from '../../graphql/mutations'
import { IAssetsProps } from '../Assets/AssetDetails'
import useStyles from './FileUPloadStyle'

const FileUpload: React.FC<IAssetsProps | null> = (props: {
  folderId: string
}) => {
  const classes = useStyles()

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  })
  const { folderId } = props
  // ici itnitialisation du state avec le folderId useless...
  const [data, setData] = useState([])

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
      <Container className={classes.container}>
        <form>
          <input type="file" name="docUpload" onChange={handleFileChange} />
          <input type="button" value="send" onClick={() => handlesubmit()} />
        </form>
      </Container>
    </>
  )
}
export default FileUpload
