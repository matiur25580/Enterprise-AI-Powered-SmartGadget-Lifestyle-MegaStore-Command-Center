require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => console.log(`Enterprise Server on ${port}`));
  })
  .catch(error => {
    console.error('DB Error:', error);
    process.exitCode = 1;
  });
