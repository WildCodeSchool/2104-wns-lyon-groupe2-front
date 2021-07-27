import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Popover, TextField } from '@material-ui/core'
import { CREATE_ASSETS } from '../../graphql/mutations'
import { GET_ASSETS } from '../../graphql/queries'
import './AddAssets.scss'

const AddAssets: React.FC = () => {
  let input: any
  const [addAssets] = useMutation(CREATE_ASSETS, {
    refetchQueries: [
      {
        query: GET_ASSETS,
      },
    ],
  })

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className="add_asset_container">
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ backgroundColor: '#454545' }}
      >
        Create New Asset
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <form
          className="form_add_asset"
          onSubmit={(e) => {
            e.preventDefault()
            addAssets({
              variables: { input: { title: input.value } },
            })
            input.value = ''
          }}
        >
          <TextField
            inputRef={(node) => {
              input = node
            }}
            label="Type name..."
            id="outlined-size-normal"
            variant="outlined"
          />
          <Button
            style={{ height: '55px' }}
            variant="contained"
            type="submit"
            onClick={handleClose}
          >
            Add
          </Button>
        </form>
      </Popover>
    </div>
  )
}

export default AddAssets
