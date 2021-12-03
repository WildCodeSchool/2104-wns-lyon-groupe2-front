import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Search from '../../Components/Search/Search'

const SearchPage: React.FC = () => {
  return (
    <div className="home_page_container">
      <Sidebar />
      <Search />
    </div>
  )
}

export default SearchPage
