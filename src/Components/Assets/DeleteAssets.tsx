import { MdDelete } from 'react-icons/md'
import { useMutation } from '@apollo/client'
import './Assets.scss'
import { GET_FOLDERS } from '../../graphql/queries'
import { DELETE_FOLDER } from '../../graphql/mutations'

type TDeleteAssetsProps = {
  id: string
}

const DeleteAssets: React.FC<TDeleteAssetsProps> = ({ id }) => {
  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    refetchQueries: [
      {
        query: GET_FOLDERS,
      },
    ],
  })

  // eslint-disable-next-line no-shadow
  const onDelete = (id: number) => {
    deleteFolder({ variables: { input: { id } } })
  }

  return (
    <>
      <div className="item" onClick={() => onDelete(id as unknown as number)}>
        <MdDelete className="icon_menu" />
        delete
      </div>
    </>
  )
}

export default DeleteAssets
