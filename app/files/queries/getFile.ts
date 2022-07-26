import { Ctx, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetFileInput = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default async function GetFile(input, ctx: Ctx) {
  GetFileInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const file = await db.file.findFirst({ where: { id: input.id } })

  if (!file) throw new NotFoundError()

  return file
}
