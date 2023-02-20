const express = require('express');

express.application.prefix = express.Router.prefix = function (path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};


const app = express();
const http = require('http').Server(app)
const cors = require('cors');
const bodyParser = require('body-parser');
const userAgent = require('express-useragent');

app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(userAgent.express())

// Api routes
require('./src/router/api.route')(app)

const PORT = 3000;

http.listen(PORT, () => {
    console.log(`Test node js server is running on port ${PORT}`)
})
