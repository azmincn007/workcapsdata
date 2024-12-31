const express = require('express')
const connection = require('./config/Db')
const  dotenv=require('dotenv')
const cors=require("cors")
const router = require('./router/testrouter')
const { jwtMiddleware } = require('./middleware/Token')

connection()

const app=express()
app.use(cors());
require('dotenv').config();
app.use(express.json())
app.use(jwtMiddleware)

dotenv.config()
app.use('/',router)
port=5001
app.listen(port,console.log('server started'))