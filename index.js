require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const router = require("./app/router/index.js");


app.use(router);

app.listen(PORT, () => {
  console.log(`Server ready : http://localhost:${PORT}`);
});