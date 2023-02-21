
const upload  = require('../helpers/uploadfile')

'use strict';

let _ = require('lodash'),
    postModel = require("../models/post"),
    config = process.config.global_config,
 
    PATH = require("path"),
	FS = require("fs"),
	EJS = require("ejs"),
    ObjectId = require('mongoose').Types.ObjectId;
    const multer = require('multer')

  

    

let getAllPost = async(user, req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    let limit = body.limit ? body.limit : 20,
    offset = body.page ? ((body.page - 1) * limit) : 0,
    findData = {};
if (body.filters) {
    if (body.filters.searchtext) {
        findData["$or"] = [
            { name: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
        ]
    }
}
    
    let allCategory  = await postModel
    .find()
    allCategory.forEach(element =>{
        let room_images = []
        if (element.room_images) {
            element.room_images.forEach(element1 => {
                room_images.push({ image: config.upload_folder + config.upload_entities.collection_folder + element1, baseimage: element1 })
            });
        }
        element.room_images = room_images;
    });
    // console.log(allCategory[0].room_images);
    let totalRecords = await postModel.countDocuments();
    let _result = { total_count: 0 };
    _result = allCategory;
    _result.total_count = totalRecords;

    return _result;

    // return postModel.find()
       
}
let getPost = async(user, post_id) => {
    if (!post_id) {
        throw new BadRequestError("post_id missing");
    }
    return postModel.findOne({ _id: ObjectId(post_id) }).select().lean().exec();
}

let addPost = async(user, req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    let collection_id;
    let f1;
    let createdData = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        address: body.address,
        phone: body.phone,
        gender: body.gender,
        car: body.car,
    };
    let room_images = []
    let roomimages = body.uploaded_files.filter(fl => fl.type == "roomimage")
    for (const i in roomimages) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == roomimages[i].imageactualname.toString() })[0];
        f1 ? room_images.push(f1.filename) : ""
    }

    createdData["room_images"] = room_images;
    createdData["room_images"] = createdData["room_images"].concat(body.remaining_url)
   
    let categorty = await postModel(createdData).save();
    if (categorty.room_images) {
        categorty.room_images.forEach(element1 => {
            room_images.push({ image: config.upload_folder + config.upload_entities.collection_folder + element1, baseimage: element1 })
        });
    }
    categorty.room_images = room_images;
    return categorty;
}
let updatePost = async(req,post_id) => {

    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    let updateData = {};
    let optionalFiled = ["firstname","lastname","email","address","phone","car"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }
    await postModel
    .updateOne({ _id: ObjectId(req.params.post_id) }, { $set: updateData })
    .exec();

let collectionAdded = await postModel
    .findOne({ _id: ObjectId(req.params.post_id) })
    .lean()
    .exec();
collectionAdded.image = config.upload_folder + config.upload_entities.collection_folder + collectionAdded.image;
return collectionAdded;

}
let deletePost = async(user, post_id) => {
    // console.log(post_id);
    if (!post_id) {
        throw new BadRequestError("post_id missing");
    }
    return postModel.deleteOne({ _id: ObjectId(post_id) }).select().lean().exec();
}

module.exports = {
    getAllPost,
    getPost,
    addPost,
    updatePost,
    deletePost
}