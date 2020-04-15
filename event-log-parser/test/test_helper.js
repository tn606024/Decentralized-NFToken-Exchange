const mongoose = require('mongoose');

before((done) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/exchange');

  // Get the default connection
  const db = mongoose.connection;

  // Bind connection to error event (to get notification of connection errors)
  db.once('open', () => { console.log('mongo open!'); })
    .on('error', console.error.bind(console, 'MongoDB connection error:'));
  done();
});

before((done) => {
  const { orderobjs } = mongoose.connection.collections;
  orderobjs.drop(() => {
    done();
  });
});
