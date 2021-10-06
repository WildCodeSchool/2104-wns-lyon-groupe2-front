import './WorkspacePopin.scss'
import { VscClose } from 'react-icons/vsc'

export type TWorkspacePopinProps = {
  workspacePopin: boolean
  setWorkspacePopin: (newValue: boolean) => React.SetStateAction<boolean>
}

const WorkspacePopin: React.FC<TWorkspacePopinProps> = ({
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
            <div onClick={() => setWorkspacePopin(false)}>
              <ul style={{ listStyle: 'none' }}>
                <li>Annuler</li>
              </ul>
            </div>
            <button type="button">Créer</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkspacePopin
