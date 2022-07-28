import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Nav from "../components/Nav"

const Layout: BlitzLayout<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className={className}> {children}</main>
    </div>
  )
}

export default Layout
