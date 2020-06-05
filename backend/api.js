const express = require('express');
var cors = require('cors');

const keys = require('./keys');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const customerRoutes = require('./routes/customers-route');
//'mongodb+srv://ankit:6jPLarTpFYLRVLXh@cluster0-ipauv.mongodb.net/node-express?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://' + keys.mongoUser + ':' + keys.mongoPassword + '@' + keys.mongoHost + '/' + keys.mongoDatabase + '?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection worked')
    }).catch(() => {
        console.log('connection failed');
    })

var allowedOrigins = ['http://localhost:4200', 'http://localhost:5000'];

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({

    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },

    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,
}));

app.use("/customers", customerRoutes);

module.exports = app;