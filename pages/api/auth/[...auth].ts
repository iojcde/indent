// app/api/auth/[...auth].ts
import { passportAuth, PublicData } from "@blitzjs/auth"
import { api } from "app/blitz-server"
import { Strategy as GithubStrategy } from "passport-github2"
import db from "db"
import { env } from "process"
import { Role } from "types"

export default api(
  passportAuth({
    successRedirectUrl: "/",
    errorRedirectUrl: "/",
    strategies: [
      {
        strategy: new GithubStrategy(
          {
            clientID: env.GITHUB_ID as string,
            clientSecret: env.GITHUB_SECRET as string,
            callbackURL:
              "https://indent-iojcde.vercel.app/api/auth/github/callback",
          },
          async function (_token, _tokenSecret, profile, done) {
            const email = profile.emails && profile.emails[0]?.value

            if (!email) {
              // This can happen if you haven't enabled email access in your twitter app permissions
              return done(new Error("Twitter OAuth response doesn't have email."))
            }

            const user = await db.user.upsert({
              where: { email },
              create: {
                email,
                name: profile.displayName,
              },
              update: { email },
            })
            const publicData: PublicData = {
              userId: user.id,
              image: profile.photos[0].value,
              role: user.role as Role,
              source: "github",
            }

            done(undefined, { publicData })
          }
        ), // Provide initialized passport strategy here
      },
    ],
  })
)
