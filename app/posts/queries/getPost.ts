import { Ctx, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPostInput = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string(),
})

export default async function GetPost(input, ctx: Ctx) {
  GetPostInput.parse(input)
  ctx.session.$isAuthorized()


  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.findFirst({ where: { id: input.id }, include: { files: true } })

  if (!post) throw new NotFoundError()

  return post
}
