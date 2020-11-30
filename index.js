const express = require('express');
const port = process.env.PORT || 8000;
const appRouter = require('./src/routes/app.route');

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use(appRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
