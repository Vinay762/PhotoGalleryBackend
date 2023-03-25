const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    photo:{
        data : Buffer,
        contentType : String
    }
},{
    timestamps : true
})

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;