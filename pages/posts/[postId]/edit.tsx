import { Suspense } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import updatePost from "app/posts/mutations/updatePost"
import { PostForm, FORM_ERROR } from "app/posts/components/PostForm"

export const EditPost = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post, { setQueryData }] = useQuery(
    getPost,
    { id: postId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePostMutation] = useMutation(updatePost)

  return (
    <>
      <Head>
        <title>Edit Post {post.id}</title>
      </Head>

      <div>
        <h1>Edit Post {post.id}</h1>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>
    </>
  )
}

const EditPostPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPost />
      </Suspense>

      <p>
        <Link href={{ pathname: "/posts" }}>
          <a>Posts</a>
        </Link>
      </p>
    </div>
  )
}

EditPostPage.authenticate = true

export default EditPostPage
