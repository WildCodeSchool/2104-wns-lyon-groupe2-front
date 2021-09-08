import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState } from 'draft-js'
import './Markdown.scss'
import SharePublication from './SharePublication'

const Markdown: React.FC = () => {
  const [editor, setEditor] = useState(EditorState.createEmpty())

  const onEditorStateChange = (
    editorState: React.SetStateAction<EditorState>,
  ) => {
    setEditor(editorState)
  }

  return (
    <div>
      <Editor
        editorState={editor}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
        handlePastedText={() => false}
      />
      <SharePublication />
    </div>
  )
}

export default Markdown
