const dns = require('node:dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const verifyJWT = require("./middleware/verifyJWT")
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn');

connectDB()

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.json());


//middleware for cookies
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'));
app.use('/user', require('./routes/api/user'));


app.use((req,res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})
mongoose.connection.once('open', () => {
    console.log("connected to mongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});