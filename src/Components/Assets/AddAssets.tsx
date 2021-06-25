/* eslint-disable no-return-assign */
import React from 'react'
import { useMutation, gql } from '@apollo/client'

export const CREATE_ASSETS = gql`
  mutation createAsset($input: InputAsset!) {
    createAsset(input: $input) {
      title
      type
      likes
    }
  }
`

interface InputAsset {
  input: {
    title: string
    type: string
    likes: number
  }
}

const AddAssets: React.FC = () => {
  let input: any
  const [addAssets, { data, error, loading }] = useMutation(CREATE_ASSETS)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    addAssets({ variables: { input: input.value } })
    input.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={(node) => {
          input = node
        }}
      />
      <button type="submit">Add Assets</button>
    </form>
  )
}

export default AddAssets
