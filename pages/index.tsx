import { BlitzPage } from "@blitzjs/auth"
import SEO from "app/core/components/SEO"
import Layout from "app/core/layouts/Layout"

const Home:BlitzPage = () => {
  return (
    <div className="container">
      <SEO />
      Welcome to Indent!
    </div>
  )
}
Home.redirectAuthenticatedTo = "/posts/new"

export default Home
