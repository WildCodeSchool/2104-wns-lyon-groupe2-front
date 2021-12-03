import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { useMutation } from '@apollo/client'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NavbarContext } from '../../Context/NavbarContext'
import { SearchContext } from '../../Context/SearchContext'
import { SEARCH } from '../../../graphql/mutations'
import { UserContext } from '../../Context/UserContext'

const useStyles = makeStyles((theme) => ({
  input: {
    width: '20vw',
    marginLeft: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    [theme.breakpoints.down(768)]: {
      width: '60vw',
      marginLeft: 100,
      marginRight: 10,
    },
  },
}))
const Searchbar: React.FC = () => {
  const history = useHistory()
  const { search, setSearch, setSearchResponse } = useContext(SearchContext)
  // FIXME : envoyer le schoolID pour faire une recherche par école
  const { userInfos } = useContext(UserContext)

  const [searchMutation] = useMutation(SEARCH, {
    fetchPolicy: 'network-only',
  })

  const searchNavigation = async () => {
    const response = await searchMutation({
      variables: {
        input: { keywords: search },
      },
    })
    console.log(
      '🚀 ~ file: Searchbar.tsx ~ line 38 ~ searchNavigation ~ response',
      response.data.search,
    )
    setSearchResponse(response.data.search)
    history.push(`/search`)
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      searchNavigation()
    }
  }

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
          onKeyPress={(e) => handleKeyPress(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon
                    className="mobile_searchbar_icon"
                    onClick={searchNavigation}
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
