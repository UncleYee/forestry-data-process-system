const config = require('../config/development')
    , mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb_url);

