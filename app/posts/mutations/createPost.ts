import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePostInput = z.object({
  name: z.string(),
})

export default async function CreatePost(input, ctx: Ctx) {
  CreatePostInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.create({ data: input })

  return post
}
