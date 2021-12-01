import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { ITags, ITagsProps } from '../../Interfaces/Assets'

const AutocompleteComponent: React.FC<ITagsProps> = function (props) {
  const { allTags } = props
  return (
    <Autocomplete
      style={{ border: 'solid' }}
      multiple
      id="tags-filled"
      options={allTags}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Tags" />}
    />
  )
}

export default AutocompleteComponent
