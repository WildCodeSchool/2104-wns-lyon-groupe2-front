import { Button, TextField } from '@material-ui/core'
import { IAddFolderProps } from '../../Interfaces/Assets'

const AddFolder: React.FC<IAddFolderProps> = ({
  setFolderName,
  sameNameError,
  submitNewFolder,
  handleClick,
  folderName,
}) => {
  return (
    <div className="add_folder_modal">
      <p>Nouveau dossier</p>
      <TextField
        error={sameNameError}
        variant="outlined"
        className="folder_title"
        onChange={(e) => setFolderName(e.target.value)}
        value={folderName || ''}
        onKeyDown={(e) => submitNewFolder(e)}
      />
      {sameNameError && (
        <p className="add_folder_modal_same_name_error">
          Un dossier portant ce nom existe déjà
        </p>
      )}
      <div className="add_folder_modal_action_bar">
        <Button onClick={() => handleClick()} variant="contained">
          Annuler
        </Button>
        <Button
          onClick={() => submitNewFolder()}
          color="primary"
          variant="contained"
        >
          Créer
        </Button>
      </div>
    </div>
  )
}
export default AddFolder
