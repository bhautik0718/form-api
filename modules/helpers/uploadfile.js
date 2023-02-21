const multer = require('multer')
const multerS3 = require('multer-s3')
const fs = require('fs');
const path = require('path');

'use strict';
let config = process.config.global_config;

const mime_type = {
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": 'docx',
  "text/plain": 'txt',
  "application/pdf": 'pdf',
  "application/rtf": 'rtf',
  "image/png" : "png",
  "image/jpg" : 'jpg',
  "image/jpeg" : 'jpg',
  "image/gif" : 'gif',
  "application/vnd.ms-excel": "csv",

}

let upload = multer({
  storage: multer.diskStorage({
      destination: function(req, files, callback) {
          callback(null, config.upload_folder+config.upload_entities.collection_folder);
      },
      filename: function(req, files, callback) {
        let fileName = Date.now() + Math.round(Math.random()*10000) + '.' + mime_type[files.mimetype]
          callback(null, fileName);
      }
  })
});


  module.exports = {upload};