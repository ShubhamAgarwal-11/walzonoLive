const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const {upload} = require('../middlewares/multer.middleware');


router.get('/getAllBlogs',blogController.getAllBlogs);
router.get('/getBlogById/:id',blogController.getBlogById);
router.post('/createBlog',upload.fields([
    {
        name: 'image', maxCount: 1
    }
]),blogController.createBlog);


module.exports = router;