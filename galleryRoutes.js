const express = require('express');
const {addImage, getAllImages,getImage, getImageId} = require('./galleryController.js');
const router = express.Router();

router.param('imageId',getImageId)
router.get('/images', getAllImages);
router.get('/image/:imageId', getImage);
router.post('/add/image', addImage);

module.exports = router;
