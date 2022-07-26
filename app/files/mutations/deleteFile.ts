import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteFileInput = z.object({
  id: z.number(),
})

export default async function DeleteFile(input, ctx: Ctx) {
  DeleteFileInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const file = await db.file.deleteMany({ where: { id: input.id } })

  return file
}
