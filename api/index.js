const express = require('express')

// Create express instnace
const app = express()

// Import API Routes
app.use(require('./routes/oembed'))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
