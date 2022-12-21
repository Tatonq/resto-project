const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const database = require('./database');
const menuAPI = require('./router/menuRouter')
const userAPI = require('./router/userRouter')
// Connected MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected succesfully');
}, err => {
    console.log('Cannot connected to Database' + err);
})



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Menu API
app.use('/api-menu', menuAPI);
app.use('/api-user', userAPI);

const port = process.env.PORT || 4000;


app.listen(port, () => console.log(`Server started at http://localhost:${port}`));