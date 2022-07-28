import { Suspense } from "react"

import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import deletePost from "app/posts/mutations/deletePost"
import SEO from "app/core/components/SEO"
import PostView from "app/core/components/PostView"

export const Post = () => {
  const router = useRouter()
  const postId = useParam("postId", "string")
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, { id: postId })

  return (
    <>
      <SEO title={post.title + " - Indent"} />

      <div>
        <h1 className="text-5xl font-semibold container my-6">{post.title}</h1>

        <div className="flex flex-col gap-8 items-center px-6">
          <PostView files={post.files}  />
        </div>
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
      <div className="container">
        <Link href={{ pathname: "/posts" }}>
          <a>Posts</a>
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  )
}

ShowPostPage.authenticate = true

export default ShowPostPage
