const twilio = require('twilio');
const ivrManager = require('../provider/ivr.js')
const contact = require('../models/contact.js');
const { where } = require('sequelize');

module.exports = {
    call: async (req, res) => {
        console.log("🚀 ~ call: ~ req.body:", req)
        const { callTo } = req.body

        const user = await contact.findOne({where: {phoneNo: callTo}})
        if(user){

            const call = await ivrManager.sendCall({ callFrom: "+15878046932", callTo })
    
            res.type('text/xml');
            return res.json(call)
        }else{
            res.status(400).json({msg: 'user not found'})
        }
    },

    msg: (req, res) => {
        const twiml = new twilio.twiml.VoiceResponse();
        const selectedOption = req.body.Digits;
        console.log(req.body)

        if (selectedOption == '1') {
            contact.update({callCompleted: true}, {where: {phoneNo: req.body.To}})
            ivrManager.sendMsg(req.body)
            twiml.say('The interview link has been sent to your phone. Goodbye!');
            twiml.hangup();
        } else if (selectedOption == '2'){
            contact.update({callCompleted: true}, {where: {phoneNo: req.body.To}})
            twiml.say('Thank you for your time, feel free to reach out if you change your mind. Have a great day!');
            twiml.hangup();
        }else {
            twiml.say('Invaild option. Goodbye!');
            twiml.hangup();
        }

        res.type('text/xml');
        res.send(twiml.toString());
    }
}