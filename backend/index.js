require('dotenv').config({path : "./.env"});
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require('./config/db')();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cookieParser());
const corsOptions = {
    origin : true,
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
app.use('/api/blog', require('./routes/blog.route'));
app.use('/api/booking', require('./routes/booking.route'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});