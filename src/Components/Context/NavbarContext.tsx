import { createContext, useState } from 'react'

export const NavbarContext: any = createContext(null)

const NavbarProvider: React.FC = ({ children }) => {
  const [popin, setPopin] = useState<boolean>(false)
  const handleClickSearchMobile: () => void = () => {
    setPopin(!popin)
  }

  return (
    <NavbarContext.Provider
      value={{ popin, setPopin, handleClickSearchMobile }}
    >
      {children}
    </NavbarContext.Provider>
  )
}

export default NavbarProvider
