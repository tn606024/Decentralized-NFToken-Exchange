const ExchangeParser = require('./ExchangeParser');
const mongoose = require('./database/mongoose');

ExchangeParser.start()
  .then((a) => { console.log(a); })
  .catch((err) => { console.log(err); });
