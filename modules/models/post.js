'use strict';

let mongoose = require("../helpers/setup_information_mongodb");
let Schema = mongoose.Schema;

let schemaDefinition = new Schema({
    firstname: {type: String},
    lastname: {type: String},
	email: {type: String},
	address: {type: String},	
    phone: {type: String},
    gender: {type: String},
    car: {type: Array},
    room_images: { type: Array },
    created_at : {type: Date,default: () => Date.now()},
    updated_at : {type: Date,default: () => Date.now()}
},{ versionKey: false,collection: 'post' });

let exportModel = mongoose.model("post", schemaDefinition);

module.exports = exportModel;