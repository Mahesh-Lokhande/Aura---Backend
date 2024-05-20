// Purpose: The app.js file is focused on setting up and configuring your Express application. This includes defining routes, applying middleware, and setting up other app-wide configurations.

const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });
// Connect DB
const DB =process.env.MONGO_URI;  // added

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB connection successful !!!");
  })
  .catch((error) => {
    console.error(`Not connected to DB. Error: ${error.message}`);
  });