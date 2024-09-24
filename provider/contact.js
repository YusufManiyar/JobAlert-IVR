const { where } = require('sequelize');
const contact = require('../models/contact.js')
const axios = require('axios')

module.exports = {
    createContact : async ({data_store='db', name, email, phoneNo, programmingLanguage, message, fileUrl }) => {
        try {

            if(data_store.toLowerCase() === 'crm') {
                // make api request using axios to freshSalesApi
                const response = await axios.post(
                    `https://${process.env.FRESHSALES_DOMAIN}/api/contacts`,
                    {name, email, mobile_number },
                    {
                        headers: {
                            'Authorization': `Token token=${process.env.FRESHSALE_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                return response.data;
            }
            else  {
                return contact.create({name, email, phoneNo, programmingLanguage, message, fileUrl})
            }
        }
        catch(error) {
            console.log("🚀 createContact: ~ error:", error)
            throw error
        }
    },

    getContact: async ({data_store='db', contact_id }) => {
        try{
            let contactInfo
            if(data_store.toLowerCase() === 'crm'){
                // make api request using axios to freshSalesApi
                const response = await axios.get(
                    `https://${process.env.FRESHSALES_DOMAIN}/api/contacts/${contact_id}`,
                    {
                        headers: {
                            'Authorization': `Token token=${process.env.FRESHSALE_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                contactInfo = response?.data?.contact;
            }else {
                contactInfo = await contact.findAll()
            }

            if(!contactInfo) {
                throw 'contact not found'
            }

            return contactInfo
        } catch(error){
            console.log("🚀 ~ getContact error:", error)
            throw error  
        }   
    },

    updateContact : async ({data_store='db', contact_id, ...updateInfo }) => {
        try {
            let result = {status: 'ok', data: {}}
            if(data_store.toLowerCase() === 'crm') {
                // make api request using axios to freshSalesApi
                const response = await axios.put(
                    `https://${process.env.FRESHSALES_DOMAIN}/api/contacts/${contact_id}`,
                    {...updateInfo},
                    {
                        headers: {
                            'Authorization': `Token token=${process.env.FRESHSALE_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                result.data =  response?.data?.contact;
            }
            else  {
               const [updatedCount] = await contact.update({ ...updateInfo }, { where: { id: contact_id}})

               if(!updatedCount) {
                    throw 'Contact not found'
               }
               result.data = await contact.findByPk(contact_id)
            }

            return result
        }
        catch(error) {
            console.log("🚀 ~ updateContact: ~ error:", error)
            throw error
        }
    },

    deleteContact: async ({data_store='db', contact_id }) => {
        try{
            if(data_store.toLowerCase() === 'crm'){
                // make api request using axios to freshSalesApi
                const response = await axios.delete(
                    `https://${process.env.FRESHSALES_DOMAIN}/api/contacts/${contact_id}`,
                    {
                        headers: {
                            'Authorization': `Token token=${process.env.FRESHSALE_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                return response?.data?.contact;
            }else {
                return contact.destroy({where: {id: contact_id}})
            }
        } catch(error){
            console.log("🚀 ~ deleteContact error:", error)
            throw error 
        }   
    },
    
}