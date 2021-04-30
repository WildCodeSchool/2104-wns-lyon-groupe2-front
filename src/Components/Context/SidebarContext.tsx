import { createContext, useState } from 'react'

export const SidebarContext: any = createContext(null)

const SidebarProvider: React.FC = ({ children }) => {
  const [workspacePopin, setWorkspacePopin] = useState(false)
  const [checked, setChecked] = useState(false)
  const [assetsPopin, setAssetsPopin] = useState(false)

  const handleClick: () => void = () => {
    if (!checked) {
      setWorkspacePopin(true)
    }
    if (checked) {
      setAssetsPopin(true)
    }
  }

  return (
    <SidebarContext.Provider
      value={{
        workspacePopin,
        handleClick,
        setWorkspacePopin,
        checked,
        setChecked,
        assetsPopin,
        setAssetsPopin,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
