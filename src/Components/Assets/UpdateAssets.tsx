import { useMutation } from '@apollo/client'
import { UPDATE_FOLDER } from '../../graphql/mutations'

type TUpdateAssetsProps = {
  id: string
  name: string
}

const UpdateAssets: React.FC<TUpdateAssetsProps> = ({ name, id }) => {
  let input: HTMLInputElement
  const [updateFolder] = useMutation(UPDATE_FOLDER)

  return (
    <>
      <p className="asset_title">{name}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateFolder({
            variables: {
              input: { id, name: input.value },
            },
          })
          input.value = ''
        }}
      >
        <input
          ref={(node) => {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;(input as HTMLInputElement | null) = node
          }}
        />
        <button type="submit">Update Assets</button>
      </form>
    </>
  )
}

export default UpdateAssets
