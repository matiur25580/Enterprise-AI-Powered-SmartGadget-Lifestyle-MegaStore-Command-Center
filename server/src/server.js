require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 10000;
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is required to start the API.');
  process.exit(1);
}
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be set to a secret of at least 32 characters.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
})
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => console.log(`Enterprise Server on ${port}`));
  })
  .catch(error => {
    console.error('DB Error:', error);
    process.exitCode = 1;
  });
