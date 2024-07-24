// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { Pool } = require("pg");

// const app = express();

// var corsOptions = {
//   origin : "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended: true}));

// const db = require("./app/models");

// db.sequelize.sync();

// app.get("/",(req, res)=>{
//   res.join({ message : "Welcome"});
// });

// require("./app/routes/tutorial.routes")(app);

// const port = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

