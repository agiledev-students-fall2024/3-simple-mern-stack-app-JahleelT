require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')
const path = require('path')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')))

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// a route to handle fetching the "About Us" content
app.get('/about', (req, res) => {
  const aboutContent = {
    name: "Jahleel Townsend",
    bio: "Hello, all! My name is Jahleel Townsend and I am a 21 year old university senior from Seattle, Washington. I study Computer Science under CAS, and I am looking to go into either cybersecurity or software engineering routes (maybe switching from one to the other in the future). I grew up in the greater seattle area for all of my life as a minor, first exploring outside of Washington when I decided to spend my first year of university abroad in NYU's Florence, Italy campus. \n\n    For personal interests, I enjoy walking, birdwatching, playing piano and guitar, trying new foods, listening to a wide range of music, and reading manga/manhwa/manhua. Something I would like to get into this semester is sketching. In particular, I want to sketch the birds that I take pictures of, though not in real time since they don't often sit still. \n\n    The reason I chose computer science as a field of interest is because I enjoy learning and working with languages, whether that be human or computer languages. Aside from the language component, being able to build working software from the ground up feels akin to building a complex puzzle, which I greatly enjoy; I used to build legos and do puzzles a lot as a child. Something that I would like to create one day is my own food-related app that works better for ranking food than Beli, better at finding food than Yelp, etc.",
    imageUrl: "/public/images/IMG_7393_2.JPG"
  }
  res.json(aboutContent)
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!