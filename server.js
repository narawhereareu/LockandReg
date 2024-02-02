const express = require('express');
const app = express()
const PORT =  8000;
const {readdirSync} = require('fs')
const dotenv = require('dotenv')
dotenv.config()
//import middleware
const cors = require('cors')
const morgan = require('morgan')
// const bodyPhaser = require('body-parser');
const connectSV = require('./config/db')

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,POST,PATCH,PUT,DELETE,HEAD',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ['authorization']
};
//usemiddleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'))

app.use(cors(corsOptions));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    next();
})

//routes
readdirSync('./routes').map((r)=>app.use('/',require('./routes/'+r)))

const startServer = async() =>{
       await connectSV.DBconnect();
       app.listen(PORT,()=>{
        console.log('Servef is running on http://localhost:8000/')
       })
    }

startServer();