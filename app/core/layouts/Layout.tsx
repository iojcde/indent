import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Nav from "../components/Nav"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode; className?: string }> = ({
  title,
  children,
  className,
}) => {
  return (
    <div>
      <Head>
        <title>{title || "notething"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <main className={className}> {children}</main>
    </div>
  )
}

export default Layout
