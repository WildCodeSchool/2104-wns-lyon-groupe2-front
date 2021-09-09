import Sidebar from '../../Components/Sidebar/Sidebar'
import Assets from '../../Components/Assets/Assets'

import './PersonnalAssets.scss'

const PersonnalAssets: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '100px' }}>
        <Assets />
      </div>
    </div>
  )
}

export default PersonnalAssets
