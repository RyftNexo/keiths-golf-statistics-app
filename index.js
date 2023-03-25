const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const clubRoutes = require('./routes/clubRoutes')
const path = require('path')

// Load environment variables from .env file
dotenv.config()

const connectDataBase = async () => {
  try {
    // Use MONGO_URI environment variable to connect to database
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to database: ${connection.connections[0].name}`)
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`)
    process.exit(1)
  }
}

connectDataBase()

// Enable CORS for all routes
app.use(cors())

// Parse request body as JSON
app.use(express.json())

// API routes
app.use('/api/clubs', clubRoutes)

// Serve static files from client/build folder
const staticPath = path.join(__dirname, '/client/build')
app.use(express.static(staticPath))

// Serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

// Start the server
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})

