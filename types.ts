import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "db"

export type Role = "ADMIN" | "USER"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: PublicData
  }
}

export interface PublicData {
  userId: User["id"]
  role: Role
  views?: number
  image: string
  source: string
}
