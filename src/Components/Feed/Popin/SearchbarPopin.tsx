import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

const SearchbarPopin: React.FC = () => {
  const [search, setSearch] = useState('')

  return (
    <div className="mobile_searchbar_container">
      <TextField
        className="mobile_searchbar"
        label="Rechercher"
        id="outlined-size-small"
        defaultValue="Small"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchbarPopin
