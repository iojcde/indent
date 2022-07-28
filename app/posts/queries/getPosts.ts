import { paginate, Ctx } from "blitz"
import db from "db"
import { Prisma } from "@prisma/client"

interface GetPostsInput
  extends Pick<Prisma.PostFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default async function Get__ModelNames(input: GetPostsInput, ctx: Ctx) {
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: posts,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip: input.skip,
    take: input.take,
    count: () => db.post.count({ where: input.where }),
    query: (paginateArgs) =>
      db.post.findMany({
        ...paginateArgs,
        where: { userId: ctx.session.userId as number, ...input.where },
        orderBy: input.orderBy,
      }),
  })

  return {
    posts,
    nextPage,
    hasMore,
    count,
  }
}
