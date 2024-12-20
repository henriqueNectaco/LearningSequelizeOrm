const express = require('express')
require('dotenv').config();
const routes = require('./routes/index')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.listen(process.env.PORT)
require('./database')
require('./crons/index')
