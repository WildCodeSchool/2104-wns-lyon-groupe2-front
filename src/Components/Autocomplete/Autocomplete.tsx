import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { ITags, ITagsProps } from '../../Interfaces/Assets'

const AutocompleteComponent: React.FC<ITagsProps> = ({ allTags }) => {
  console.log(allTags)
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={allTags}
      /* getOptionLabel={(option) => option.title} */
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="filterSelectedOptions"
          placeholder="Favorites"
        />
      )}
    />
  )
}

export default AutocompleteComponent
