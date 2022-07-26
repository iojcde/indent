import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createPost from "app/posts/mutations/createPost"
import EditorList from "app/core/components/EditorList"
import { useMemo, useState } from "react"
import { File } from "app/core/components/Editor"
import { v4 as generateUUID } from "uuid"

const NewPostPage = () => {
  const router = useRouter()

  const emptyFile = useMemo<File[]>(
    () => [
      {
        filename: "",
        content: "",
        id: generateUUID(),
      },
    ],
    []
  )
  const [files, setFiles] = useState<File[]>(emptyFile)
  const [createPostMutation] = useMutation(createPost)

  return (
    <Layout title={"Create New Post"} className="px-6">
      <div className="container my-6">
        <h1 className="text-4xl font-semibold">Create New Post</h1>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <EditorList files={files} />
      </div>
      <button
        onClick={() => {
          setFiles([
            ...files,
            {
              filename: "",
              content: "",
              id: generateUUID(),
            },
          ])
        }}
      >
        Add a File
      </button>
      <p>
        <Link href={{ pathname: "/posts" }}>
          <a>Posts</a>
        </Link>
      </p>
    </Layout>
  )
}

NewPostPage.authenticate = true

export default NewPostPage
