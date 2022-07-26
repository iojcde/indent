import db from "db"
import { z } from "zod"

const UpdateFileInput = z.object({
  id: z.number(),
  name: z.string(),
})

export default async function UpdateFile(input, ctx: Ctx) {
  UpdateFileInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const file = await db.file.update({ where: { id: input.id }, input })

  return file
}
