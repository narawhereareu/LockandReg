const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String, require:true},
    lastname:{type:String,require:true},
    email:{
        type:String,
        require:true,
        },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    gender:{
        type:String,
        require:true
    },
    birthday:{type:Date},
    register_at:{type:Date}
})

userSchema.virtual('id').get(async function () {
    const count = await this.constructor.countDocuments({});
    return count + 1;
});


const tb_users = mongoose.model('users', userSchema);
module.exports = tb_users;