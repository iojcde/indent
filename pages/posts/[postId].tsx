import { Suspense } from "react"

import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import deletePost from "app/posts/mutations/deletePost"

export const Post = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, { id: postId })

  return (
    <>
      <Head>
        <title>Post {post.id}</title>
      </Head>

      <div>
        <h1>Post {post.id}</h1>
        <pre>{JSON.stringify(post, null, 2)}</pre>

        <Link href={{ pathname: "/posts/[postId]/edit", query: { postId: post.id } }}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePostMutation({ id: post.id })
              await router.push({ pathname: "/posts" })
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPostPage = () => {
  return (
    <div>
      <p>
        <Link href={{ pathname: "/posts" }}>
          <a>Posts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  )
}

ShowPostPage.authenticate = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
