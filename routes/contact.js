const express = require('express')
const contact = require('../controllers/contatct.js')
const upload = require('../middleware/file.js')
const router = express.Router()

router.post('/createContact',upload.single('file'), contact.create)
router.get('/getContact', contact.getById)
router.post('/updateContact', contact.update)
router.post('/deleteContact', contact.delete)

module.exports = router