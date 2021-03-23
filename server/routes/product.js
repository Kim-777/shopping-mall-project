const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({storage: storage}).single('file');


router.post('/image', (req, res) => {

    // 가져온 이미지를 저장해줍니다.
    upload(req, res, err => {
        if(err) {
            return res.json({success: false, err});
        }

        return res.status(200).json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename});
    })

})


router.post('/', (req, res) => {

    // 받아온 정보들을 DB에 넣어 줍니다.
    const product = new Product(req.body);
    product.save((err, doc) => {
        if(err) return res.status(400).json({success:false, err});

        return res.status(200).json({success: true});
    })
})

module.exports = router;
