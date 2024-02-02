const mongoose = require('mongoose')

const DBconnect = async() =>{
    try{
        await mongoose.connect(process.env.DB)
        console.log('Database is connect')
        }
    catch(err){
     console.log(err)
    }
 }

 module.exports = {DBconnect}