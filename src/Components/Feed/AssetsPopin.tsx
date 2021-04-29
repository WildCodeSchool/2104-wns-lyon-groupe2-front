import './AssetsPopin.scss'
import { VscClose } from 'react-icons/vsc'

type TAssetsPopinProps = {
  assetsPopin: boolean
  setAssetsPopin: (newValue: boolean) => React.SetStateAction<boolean>
}

const AssetsPopin: React.FC<TAssetsPopinProps> = ({
  assetsPopin,
  setAssetsPopin,
}) => {
  return (
    <div className="popin_container">
      {assetsPopin && (
        <div className="popin_add_assets">
          <div className="popin_header">
            <p>Ajouter une ressource</p>
            <VscClose onClick={() => setAssetsPopin(false)} />
          </div>
          <div className="popin_footer">
            <ul style={{ listStyle: 'none' }}>
              <li onClick={() => setAssetsPopin(false)}>Annuler</li>
            </ul>
            <button type="button">Créer</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssetsPopin
