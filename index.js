require("dotenv").config();
const express = require('express');
// const session = require('express-session');
const router = require("./app/router/index.js");
const app = express();
const PORT = process.env.PORT || 3000;

/* Configuration des sessions */
// const sessionConfig = {
// 	secret: process.env.SESSION_SECRET,
// 	resave: true,
// 	saveUninitialized: true,
// 	cookie: {
// 		secure: false,
// 		maxAge: (1000*60*60)
// 	},
// };

app.use(express.static('public'));
app.use(express.json());

// const sessionMiddleware = session(sessionConfig);
// app.use(sessionMiddleware);


app.use("/api",router);

app.listen(PORT, () => {
  console.log(`Server ready : http://localhost:${PORT}`);
});


// module.exports = { app, sessionMiddleware};