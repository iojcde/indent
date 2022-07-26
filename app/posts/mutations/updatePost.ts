import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePostInput = z.object({
  id: z.number(),
  name: z.string(),
})

export default async function UpdatePost(input, ctx: Ctx) {
  UpdatePostInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.update({ where: { id: input.id }, data: input })

  return post
}
