const { CronJob } = require('cron');
const contact = require('../models/contact.js')
const { call } = require('../controllers/ivr.js')
const ivrManager = require('../provider/ivr.js')
const { Op } = require('sequelize');

async function fetchData (){
    const contactData = await contact.findAll({where: {callCompleted: false, callAttempt: {[Op.lt] : 3}}})
    console.log("🚀 ~ fetchData ~ contactData:", contactData)

    // const newContactData = contactData.filter((data) => !data.callCompleted && data.callAttempt < 3)
    contactData.forEach(async contact => {
        const callInfo = await ivrManager.sendCall({callFrom: "+15878046932", callTo: contact.phoneNo})
        contact.update({callAttempt: contact.callAttempt+1})
        console.log("🚀 ~ fetchData ~ callInfo:", callInfo)
    })
}

const job = new CronJob('* * * * *', fetchData, null, true, 'Asia/Kolkata');

module.exports = job