import { createContext, useState } from 'react'

export const SearchContext: any = createContext(null)

const SearchProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState<string>('')
  const [searchResponse, setSearchResponse] = useState<any>(null)

  return (
    <SearchContext.Provider
      value={{ search, setSearch, searchResponse, setSearchResponse }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
