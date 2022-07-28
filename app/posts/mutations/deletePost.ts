import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePostInput = z.object({
  id: z.string(),
})

export default async function DeletePost(input, ctx: Ctx) {
  DeletePostInput.parse(input)
  ctx.session.$isAuthorized()
  console.log(ctx.session.userId)

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  const post = await db.post.deleteMany({
    where: { id: input.id, userId: ctx.session.userId as number },
  })

  return post
}
