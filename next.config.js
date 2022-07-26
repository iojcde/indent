const { withBlitz } = require("@blitzjs/next")

module.exports = withBlitz({
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  swcMinify: true
})
