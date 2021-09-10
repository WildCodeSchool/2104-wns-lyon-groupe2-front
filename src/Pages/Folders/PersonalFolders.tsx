import Sidebar from '../../Components/Sidebar/Sidebar'
import PersonalFoldersHome from '../../Components/PersonalFolders/PersonalFoldersHome'

import './PersonalFolders.scss'

const PersonalFolders: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <PersonalFoldersHome />
    </div>
  )
}

export default PersonalFolders
