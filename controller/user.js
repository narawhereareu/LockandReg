const bcrypt = require('bcrypt')
const tokens = require('../utils/token.js')
const tb_users = require('../model/user.js')

exports.test = async(req,res) =>{
    res.send('User is connect')
}

exports.login = async(req,res,next) =>{
    try{
        const {email,password} = req.body

        const finduser = await tb_users.findOne({email});
        if(!finduser){
            console.log('User not found')
            return res.status(401).json({error: 'Invalid email or Password'})
        }

        const isValidPassword = await bcrypt.compare(password, finduser.password)
        if(!isValidPassword){
            return res.status(401).json({error: 'Invalid password'})
        }

        //generate tokens
        const Payloads = {
            name: finduser.name,
            lastname:  finduser.lastname,
            userId: finduser._id,
            email:finduser.email
        }

        const token = tokens.getToken(Payloads);
        res.status(200).json({token})

    }
    catch(error){
        next(error)
    }
}

exports.register = async(req,res,next) =>{
    try{
        const {email,password,name,lastname,gender} = req.body;
        console.log(req.body)
        if(!email || !password || !name || !lastname || !gender){
            res.status(400).send("Hey check it!!!")
            return;
        }

        const oldData = await tb_users.findOne({email});
        if(oldData){
            return res.status(400).send('Email already exits!!!!!')
        }

        const register_at = new Date();
        const saltRound = 10;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;;
        if(!passwordPattern.test(password)){
            return res.status(400).send('Password shuld have big and some special!!')
        }
        const hashPass = bcrypt.hashSync(password,+ saltRound);
        
        const new_user = {
            email: email.toLowerCase(),
            name,lastname,gender,
            password: hashPass,
            register_at
        };
        await tb_users.create(new_user);
        // res.status(201).send('Create Success');
        // return res.status(201).json(new_user);
        return res.status(201).json(new_user);
    }
    catch(error){
        console.log(error)
        res.status(500).send('error')
        next(error)
    }
}

exports.getusers = async(req,res,next) =>{
    try{
        const user_id = req.params.id
        console.log(user_id);
        console.log('req headers',req.headers)

        const findUser = await tb_users.findById(user_id);
        if(!findUser){
            res.status(404).send({ message: "user is no found", statusCode: 404 })
        }

        const userData ={
            email: findUser.email,
            name: findUser.name,
            lastname: findUser.lastname
        };

        res.status(200).send(userData)
    }
    catch(error){
        res.status(500).send('error');
        next(error)
    }
}

exports.deleteId = async(req,res,next) =>{
    try{
        const userId = req.params.id;
        const deleteuserId = await tb_users.findById(userId);
        if(!deleteuserId){
            return res.status(404).send({error: "user not Found!!!!"})
        }

        await tb_users.findByIdAndDelete(userId)
        res.status(200).send('User deleteded!')
    }
    catch(err){
        console.log(err)
        res.status(500).send({error:'server error'});
        next(err)
    }
}