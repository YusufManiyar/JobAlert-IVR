require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const contactRouter = require('./routes/contact.js')
const ivrRouter = require('./routes/ivr.js')
const bodyParser = require('body-parser')
const cors = require('cors');
const makeCall = require('./middleware/makeCall.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors({
  origin: '*',
}));

app.use('/contact', contactRouter)
app.use('/', ivrRouter)

const PORT = process.env.PORT 

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    makeCall.start()
    console.log(`Server is running on port ${PORT}`)

  })
})