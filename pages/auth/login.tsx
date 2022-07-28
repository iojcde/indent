import Layout from "app/core/layouts/Layout"
import { useRouter } from "next/router"
import { AiFillGithub } from "react-icons/ai"

const LoginPage = () => {
  const router = useRouter()

  return (
    <>
      <h1 className=" mt-16 text-semibold text-7xl mx-auto block mb-4 text-center">
        Sign in to Indent
      </h1>

      <div className="rounded-xl border mx-auto p-6 max-w-md">
        <a
          href="/api/auth/github"
          className="rounded-lg items-center gap-2 flex text-xl px-8 py-2 shadow bg-black text-white border"
        >
          <AiFillGithub /> Sign in with{` `}
          GitHub
        </a>
      </div>
    </>
  )
}

export default LoginPage
