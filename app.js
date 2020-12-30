require('dotenv').config();

const express = require("express"); 
const db = require("./db")

const app = express() 

app.use(require('./middleware/headers'))
const controllers = require("./controllers");


app.use(express.json());


app.use("/user", controllers.usercontroller)
app.use("/comment", controllers.commentscontroller)
app.use("/playlist", controllers.playlistcontroller)


db.authenticate()
.then(() => db.sync()) 
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`))
    })
    .catch((err)=> {
        console.log("[Server: ] Server Crashed");
        console.error(err)
    })

