const express = require("express");
const app = express();
app.use(express.json());

const models = require('./model');
const USER_ROUTER = require('./routes/user');
const USER_AUTH = require('./routes/auth');

app.use('./users', USER_ROUTER);
app.use('/auth', USER_AUTH);

app.use("*", (req, res, next) => {
    console.log('app works!');
    return res
        .status(400)
        .send({
            code: 400,
            status: 'failed'
        });
});

models.db_config
.sync({
    
}).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
});