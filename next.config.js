const { withBlitz } = require("@blitzjs/next")

module.exports = withBlitz({
  reactOnRecoverableError: (...args) => {
    console.error(...args)
  },
})
