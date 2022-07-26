import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const CreateFileInput = z.object({
  name: z.string(),
})

export default async function CreateFile(input, ctx: Ctx) {
  CreateFileInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const file = await db.file.create({ data: input })

  return file
}
