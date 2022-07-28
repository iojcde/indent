import Editor, { File } from "./Editor"

const PostView: React.FC<{
  files: File[]
}> = ({ files }) => {
  return (
    <>
      {files.map(({ id, content, filename }, i) => (
        <Editor
          key={i}
          readonly={true}
          filename={filename}
          content={content}
          setFilename={(a) => {}}
          onContentChange={(a) => {}}
        />
      ))}
    </>
  )
}
export default PostView
