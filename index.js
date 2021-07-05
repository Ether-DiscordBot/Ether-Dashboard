const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const path = require('path');
const Discord = require('discord.js');

const routes = require('./public/routes');
const utils = require('./public/utils');
const api = require('./public/api');
const mongoose = require('./public/mongoose')


const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', require('ejs').renderFile);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.bot = new Discord.Client();
app.db = new mongoose.db(app)

app.aouth2Link = "https://discord.com/api/oauth2/authorize?client_id=693456698299383829&redirect_uri=https%3A%2F%2Fz7b9cefb1-gtw.qovery.io%2F&response_type=code&scope=identify%20guilds"

utils(app);
routes(app);
api(app);

app.bot.on('ready', () => {
	console.log(`Logged in as ${app.bot.user.tag}!`);
})

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port} !`)
})

app.bot.login(process.env.BOT_TOKEN);
