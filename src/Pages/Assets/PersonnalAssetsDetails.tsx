import AssetDetails from '../../Components/Assets/AssetDetails'
import Sidebar from '../../Components/Sidebar/Sidebar'
import useStyles from './PersonnalAssetsDetailsStyle'

const PersonnalAssetsDetails: React.FC = (props: any) => {
  const classes = useStyles()
  const {
    match: {
      params: { id },
    },
  } = props
  return (
    <div className={classes.main}>
      <Sidebar />
      <AssetDetails folderId={id} />
    </div>
  )
}

export default PersonnalAssetsDetails
