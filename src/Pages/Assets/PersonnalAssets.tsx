import FileUpload from '../../Components/FileUPload/FileUpload'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Assets from '../../Components/Assets/Assets'

import './PersonnalAssets.scss'

const PersonnalAssets: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Assets />
    </div>
  )
}

export default PersonnalAssets
