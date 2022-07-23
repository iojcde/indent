import { useMutation } from "@blitzjs/rpc"
import logout from "app/auth/mutations/logout"
import { useSession } from "@blitzjs/auth"
import { Menu } from "@headlessui/react"
import Image from "next/image"
import Avvvatars from "avvvatars-react"
import Link from "next/link"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"

const UserSection = () => {
  const session = useSession()
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  return (
    <div className="flex items-center gap-4 text-sm">
      {session.isLoading && <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />}

      {!session.isLoading && user && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center">
            {session && session.image ? (
              <Image src={session.image} width={32} height={32} alt="" className="rounded-full" />
            ) : (
              <Avvvatars value={user?.email as string} size={32} />
            )}
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item as="div" className="p-4">
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item as="div" className="p-4">
              <Link href="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item
              as="div"
              onClick={() => logoutMutation()}
              className="p-4 text-sm w-full text-left"
            >
              Logout
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}

      {!user && (
        <>
          {" "}
          <Link href={Routes.SignupPage()}>
            <a className="button small">Sign Up</a>
          </Link>
          <Link href={Routes.LoginPage()}>
            <a className="button small">Login</a>
          </Link>
        </>
      )}
    </div>
  )
}

export default UserSection
