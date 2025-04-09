require('dotenv').config({path : "./.env"});
require("@babel/register")({
    extensions: [".js", ".jsx"],
    presets: ["@babel/preset-env", "@babel/preset-react"]
  });  
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require('./config/db')();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cookieParser());
const corsOptions = {
    origin : "http://localhost:5173",
    credentials : true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// router mounting...
app.use('/api/user', require('./routes/user.route'));
app.use('/api/partner', require('./routes/partner.route'));
app.use('/api/cart', require('./routes/cart.route'));
app.use('/api/service', require('./routes/service.route'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});