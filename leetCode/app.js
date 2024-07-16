const express = require('express');
const bodyParser     = require('body-parser');
const Config = require('./libs/config');

const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const app = express();

//const PORT = process.env.PORT || 4000;

const users = {};
const tasks = {};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', usersRouter);
app.use('/task', tasksRouter);
// ==================Errors
app.use((err, req, res, next) => {
    console.log('Error: ', err.stack);
    res.status(502).json({message: 'Server Error'});
});
app.use((req, res) => {
    res.status(404).json({message:'Not found'});
});

app.listen(Config.port, () => {console.log(`Началось прослушивание http://localhost:${Config.port}`);});

module.exports.app = app;