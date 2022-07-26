import { paginate, Ctx } from "blitz"
import db from "db"
import { Prisma } from "@prisma/client"

interface GetFilesInput
  extends Pick<Prisma.FileFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default async function Get__ModelNames(input: GetFilesInput, ctx: Ctx) {
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: files,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip: input.skip,
    take: input.take,
    count: () => db.file.count({ where: input.where }),
    query: (paginateArgs) =>
      db.file.findMany({ ...paginateArgs, where: input.where, orderBy: input.orderBy }),
  })

  return {
    files,
    nextPage,
    hasMore,
    count,
  }
}
