import MarkDown from '../../Components/Publication/Markdown'
import './Publication.scss'

const Publication: React.FC = () => {
  return (
    <div className="editor_container">
      <h3 className="title_editor">Rédiger une nouvelle ressource</h3>
      <div className="editor">
        <MarkDown />
      </div>
    </div>
  )
}

export default Publication
