const mongoose = require('./database/mongoose');

const TokenParser = require('./TokenParser');

const Parser = new TokenParser('NFToken');

Parser.start().then((a) => { console.log(a) }).catch((err) => { console.log(err) });
