const express = require('express');
const router = require('./routes/routes')
const db = require('./config/connection')

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
