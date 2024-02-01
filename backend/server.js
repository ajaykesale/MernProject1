const express = require('express');
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoute");
const dotenv = require("dotenv");
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

mongoose
    .connect(process.env.URI).then(() => {
        console.log("Database Connection Successfully....");
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err);
            console.log("running successfully at ", process.env.PORT)
        });
    }).catch((error) => {
        console.log("error", error);
    });

app.use(userRoute);


//npm dev run - to start the server 