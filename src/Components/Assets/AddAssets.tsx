/* eslint-disable no-return-assign */
import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { CREATE_ASSETS } from '../../graphql/mutations'

const AddAssets: React.FC = () => {
  let input: any
  const [addAssets] = useMutation(CREATE_ASSETS)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addAssets({
          variables: { input: { title: input.value } },
        })
        input.value = ''
      }}
    >
      <input
        ref={(node) => {
          input = node
        }}
      />
      <button type="submit">Create Assets</button>
    </form>
  )
}

export default AddAssets
