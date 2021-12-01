import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { ITags, ITagsProps } from '../../Interfaces/Assets'
import '../FileUPload/FileUpload.scss'

const AutocompleteComponent: React.FC<ITagsProps> = function (props) {
  const { allTags, setTagsSelected } = props
  const handleSelectTags = (event, value) => {
    setTagsSelected(value)
  }
  return (
    <Autocomplete
      onChange={handleSelectTags}
      multiple
      id="tags-filled"
      options={allTags}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label="Tags" variant="outlined" />
      )}
    />
  )
}

export default AutocompleteComponent
