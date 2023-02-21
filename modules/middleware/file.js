// const multer = require('multer')
// const path = require('path')
// mime_type_map = {
//   'image/png':'png',
//   'image/jpeg':'jpg',
//   'image/jpg':'jpg'
// }
// const storage = multer.diskStorage({
//   destination:  (req, file, cb)=> {
//     cb(null, 'images/')
//   },
//   filename: (req, file, cb) =>{
//     const name =file.originalname.toLowerCase().split(' ').join('-')
//     cb(null, name + '-' + Date.now()+ '.' +ext)
//   }
// })
// module.exports = multer({storage:storage}).single("image")
