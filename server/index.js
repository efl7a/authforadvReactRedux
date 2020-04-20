const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();

//DB Setup
mongoose.connect(process.env.CONNECT_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

//App Setup - Express
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on : ', port);
