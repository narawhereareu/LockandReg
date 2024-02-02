const jwt = require('jsonwebtoken')
const authenticateToken = (req,res,next) =>{
    try{
        const tokenWithMe = req.headers.authorization;
        if(!tokenWithMe){
            console.log('No Token provided');
            return res.sendStatus(401);
        }
        const token = tokenWithMe.split(' ')[1];

        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(err){
                console.log('Invalid token',err);
                return res.sendStatus(401);
            }
            req.user = decoded.payload;
            next();
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send('Internal server error');
    }
}

module.exports = { authenticateToken };
