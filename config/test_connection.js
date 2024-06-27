const pool = require('./database.js');

pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
    } else {
      console.log('Connection successful');
      release();
    }
    pool.end();
  });
