'use strict';
let MongooseObj = require("mongoose").Mongoose,
    config   = process.config.global_config.setup_information_mongodb;

let mongoose = new MongooseObj();

mongoose.connect(config.host+ ":" + config.port + "/" + config.database_name,{ useNewUrlParser: true, useUnifiedTopology: true },);

mongoose.Promise = global.Promise;

module.exports = mongoose;