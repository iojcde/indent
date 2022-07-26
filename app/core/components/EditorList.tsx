import Editor from "./Editor"
import {File} from './Editor'

const EditorList: React.FC<{ files: File[] }> = ({ files }) => {
  return (
    <>
      {files.map(({ id, content, filename }, i) => (
        <Editor key={i} filename={filename} content={content}  />
      ))}
    </>
  )
}
export default EditorList
