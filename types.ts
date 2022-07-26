import { SimpleRolesIsAuthorized, SessionContext } from "@blitzjs/auth"
import { Ctx } from "blitz"
import { User } from "db"

export type Role = "ADMIN" | "USER"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: PublicData
  }
}

declare module "blitz" {
  export interface Ctx extends Ctx {
    session: SessionContext
  }
}

export interface PublicData {
  userId: User["id"]
  role: Role
  views?: number
  image: string
  source: string
}
