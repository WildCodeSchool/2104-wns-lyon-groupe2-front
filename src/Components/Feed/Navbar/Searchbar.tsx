import React, { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import { NavbarContext } from '../../Context/NavbarContext'

const Searchbar: React.FC = () => {
  const [search, setSearch] = useState<string>('')

  const { handleClickSearchMobile } = useContext(NavbarContext)

  return (
    <>
      <SearchIcon
        className="mobile_searchbar_icon"
        onClick={handleClickSearchMobile}
      />

      <TextField
        className="desktop_searchbar"
        label="Rechercher"
        id="outlined-size-small"
        defaultValue="Small"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  )
}

export default Searchbar
