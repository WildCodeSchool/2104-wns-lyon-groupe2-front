import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../Feed/Navbar/Navbar'
import Searchbar from '../Feed/Navbar/Searchbar'
import './Search.scss'
import { SearchContext } from '../Context/SearchContext'
import SearchUsers from './Search_users'
import SearchAssets from './Search_assets'
import SearchFolders from './Search_folders'

const useStyles = makeStyles((theme) => ({
  search_containers: {
    padding: '20px',
    width: '100%',
    borderTop: 'blue',
  },
  assets: { width: '100%' },
  folders: { width: '100%', display: 'flex', flexWrap: 'wrap' },
  users: { width: '100%', display: 'flex', flexWrap: 'wrap' },
}))

const Search: React.FC = () => {
  const { searchResponse } = useContext(SearchContext)
  const classes = useStyles()

  const { assets } = searchResponse || {}
  const { folders } = searchResponse || {}
  const { users } = searchResponse || {}

  return (
    <div className="search_container">
      <div
        className="search_header"
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          width: '100%',
          height: 100,
        }}
      >
        <Searchbar />
        <Navbar />
      </div>
      {searchResponse ? (
        <div className="search_results">
          <>
            {users.length ? (
              <div className={classes.search_containers}>
                <h2>Utilisateurs</h2>
                <div className={classes.users}>
                  {users.map((user) => {
                    return <SearchUsers user={user} />
                  })}
                </div>
              </div>
            ) : (
              ''
            )}
          </>
          <>
            {folders.length ? (
              <div className={classes.search_containers}>
                <h2>Dossiers</h2>
                <SearchFolders folders={folders} />
              </div>
            ) : (
              ''
            )}
          </>
          <>
            {assets.length ? (
              <div className={classes.search_containers}>
                <h2>Ressources</h2>
                <SearchAssets assetsList={assets} />
              </div>
            ) : (
              ''
            )}
          </>
        </div>
      ) : (
        <div>Aucun résultat</div>
      )}
    </div>
  )
}

export default Search
