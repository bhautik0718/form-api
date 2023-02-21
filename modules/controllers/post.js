const upload  = require('../helpers/uploadfile')
'use strict';

/**
 * importing dependencies
 */
let postManager = require('../manager/post'),
    url = require('url');

let getAllPost = (req, res, next) => {
    let user = req.user;

    postManager
        .getAllPost(user, req,req.body)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}


let getPost = (req, res, next) => {
    let user = req.user;
    let post_id = req.params.post_id;
    postManager
        .getPost(user, post_id)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}


let addPost = (req, res, next) => {
    let user = req.user;
    postManager
        .addPost(user,req, req.body)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}



let updatePost = (req, res, next) => {
    let user = req.user;
    let post_id = req.params.post_id
    postManager
        .updatePost( req,post_id)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}


let deletePost = (req, res, next) => {
    let user = req.user;
    let post_id = req.params.post_id
    console.log(post_id);
    postManager
        .deletePost(user, post_id)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}
module.exports = {
    getAllPost,
    getPost,
    addPost,
    updatePost,
    deletePost
}