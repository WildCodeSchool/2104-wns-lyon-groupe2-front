import React, { useContext, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NavbarContext } from '../../Context/NavbarContext'

const useStyles = makeStyles((theme) => ({
  input: {
    width: '40vw',
    marginLeft: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    [theme.breakpoints.down(768)]: {
      width: '60vw',
      marginLeft: 100,
      marginRight: 10,
    },
  },
  noBorder: {
    border: 'none',
  },
}))
const Searchbar: React.FC = () => {
  const [search, setSearch] = useState<string>('')

  const { handleClickSearchMobile } = useContext(NavbarContext)
  const classes = useStyles()
  return (
    <>
      <div>
        <TextField
          label="Rechercher"
          id="outlined-size-small"
          defaultValue="Small"
          variant="outlined"
          size="small"
          className={classes.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            classes: { notchedOutline: classes.noBorder },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon
                    className="mobile_searchbar_icon"
                    onClick={handleClickSearchMobile}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </>
  )
}

export default Searchbar
