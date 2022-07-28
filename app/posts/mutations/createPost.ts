import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"
import { File } from "app/core/components/Editor"

const files = z.object({
  filename: z.string(),
  content: z.string(),
  id: z.string(),
})

const CreatePostInput = z.object({
  title: z.string(),
  files: z.array(files),
})

export default async function CreatePost(input, ctx: Ctx) {
  CreatePostInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.create({
    data: {
      files: { create: input.files },
      title: input.title,
      userId: ctx.session.userId as number,
    },
  })

  return post
}
