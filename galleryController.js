const formidable = require('formidable');
const Gallery = require('./galleryModel');
const fs = require('fs')

exports.addImage =  (req,res) => {
    const form =  formidable({ multiples: true });
    form.parse(req,(error,fields, files)=>{
        if(files?.image){
            const gallery = new Gallery()
            gallery.photo.data = fs.readFileSync(files?.image.filepath);
            gallery.photo.contentType = files.image.mimetype;
            console.log(">>>>>>>>>>>>>>>>>>>>");
            gallery.save().then((data) => {
                return res.json(data);
            }).catch((err) => {
                return res.staus(400).sjon({
                    error : "not able to save"
                })
            })
        }
    })
}


exports.getImageId = async(req, res, next, id) => {
    try{
        const data = await Gallery.findById(id);
        req.image = data;
        next();
    }catch{
        return res.status(400).json({
            message : "No image Found"
        })
    }
}

exports.getAllImages = async(req, res) => {
    try{
        const data  = await Gallery.find();
        if(data.length == 0){
            return res.status(400).json({
                error : "Not able to Find"
            })
        }
        res.json(data);
    }catch{
        return res.status(400).json({
            error : "Not able to Find"
        })
    }
}

exports.getImage = (req,res) => {
    res.set("Content-Type", req.image.photo.contentType);
    res.send(req.image.photo.data)
}