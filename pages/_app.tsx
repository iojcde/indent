import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { withBlitz } from "app/blitz-client"
import "styles/global.css"
import "styles/syntax.css"
import Layout from "app/core/layouts/Layout"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return (
      <Layout>
        <div>Error: You are not authenticated</div>
      </Layout>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <Layout>
        <ErrorComponent
          statusCode={error.statusCode}
          title="Sorry, you are not authorized to access this"
        />
      </Layout>
    )
  } else {
    return (
      <Layout>
        {" "}
        <ErrorComponent
          statusCode={(error as any)?.statusCode || 400}
          title={error.message || error.name}
        />
      </Layout>
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
