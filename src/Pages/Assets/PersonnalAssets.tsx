import FileUpload from '../../Components/FileUPload/FileUpload'
import Sidebar from '../../Components/Sidebar/Sidebar'

import './PersonnalAssets.scss'

const PersonnalAssets: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <FileUpload />
    </div>
  )
}

export default PersonnalAssets
