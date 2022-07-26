import { ChangeEvent, useCallback } from "react"
import Editor, { File } from "./Editor"

const EditorList: React.FC<{
  files: File[]
  removeFile: (i: number) => () => void
  updateFilename: (i: number) => (filename: string) => void
  updateContent: (i: number) => (content: string) => void
}> = ({ files, updateFilename, updateContent, removeFile }) => {
  const handleOnChange = useCallback(
    (i: number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
      updateContent(i)(e.target.value)
    },
    [updateContent]
  )
  return (
    <>
      {files.map(({ id, content, filename }, i) => (
        <Editor
          key={i}
          filename={filename}
          content={content}
          setFilename={updateFilename(i)}
          onContentChange={handleOnChange(i)}
          remove={removeFile(i)}
        />
      ))}
    </>
  )
}
export default EditorList
