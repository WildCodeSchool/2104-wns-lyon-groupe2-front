/* eslint-disable  */
import './WorkspacePopin.scss'
import { VscClose } from 'react-icons/vsc'

type TWorkspacePopinPros = {
  workspacePopin: boolean
  setWorkspacePopin: (newValue: boolean) => React.SetStateAction<boolean>
}

const WorkspacePopin: React.FC<TWorkspacePopinPros> = ({
  workspacePopin,
  setWorkspacePopin,
}) => {
  return (
    <div className="popin_container">
      {workspacePopin && (
        <div className="popin_add_channel">
          <div className="popin_header">
            <p>Créer un salon</p>
            <VscClose onClick={() => setWorkspacePopin(false)} />
          </div>
          <div className="popin_footer">
            <ul style={{ listStyle:'none' }}>
              <li onClick={() => setWorkspacePopin(false)}>Annuler</li>
            </ul>
            <button type='button'>Créer</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkspacePopin
