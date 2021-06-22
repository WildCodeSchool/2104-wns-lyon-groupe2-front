import Assets from '../../Components/Assets/Assets'
import Navbar from '../../Components/Feed/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './PersonnalAssets.scss'

const PersonnalAssets: React.FC = () => {
  return (
    <>
      <div className="container_assets_page">
        {/*  <Sidebar /> */}
        <div className="nav_assets">
          {/*     <Navbar /> */}
          <div className="assets">
            <Assets />
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonnalAssets
