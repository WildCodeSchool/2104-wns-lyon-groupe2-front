import Assets from '../../Components/Sidebar/Sidebar'
import Sidebar from '../../Components/PersonnalFolders/Home'

import './PersonnalAssets.scss'

const PersonnalAssets: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Assets />
      <Sidebar />
    </div>
  )
}

export default PersonnalAssets
