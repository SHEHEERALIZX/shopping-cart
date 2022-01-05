var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/product')
// const multer = require('multer')
const AWS = require('aws-sdk');

// const storage = multer.memoryStorage({
// //   destination: (req,file,cb)=>{
// //     cb(null,'')
// //   }
// // })

// const upload = multer({storage}).single(image)

const ID = 'AKIASENLOBC54XRX7TV7'
const SECRET = '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'
const BUCKET_NAME = 'my-public-assests'

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});


/* GET home page. */
router.get('/', async function (req, res, next) {

  let items = await Product.find().lean()


  res.render('admin/view-products', { items, admin: true });
});

router.get('/add', function (req, res, next) {

  res.render('admin/add-product', { admin: true });
});

router.post('/add', async function (req, res, next) {



  const { name, image, description } = req.body

 
  if (req.files) {
    console.log(req.files.Image)
    const params = {
      Bucket: BUCKET_NAME,
      Key: `${uuidv4()}.jpg`, // File name you want to save as in S3
      Body: req.files.Image.data
    };

    

    s3.upload(params, async function  (err, data) {
      if (err) {
        throw err;
      }
      console.log(data)
      console.log(`File uploaded successfully. ${data.Location}`);
      let item = await Product.create({
        name,
        image,
        description,
        imgUrl:data.Location
      })
    });

  

    // let img = req.files.Image
    // img.mv('./public/product-images/' + item.id + '.jpg')
  }
  // console.log(item.id);
  res.redirect('/admin/add')


});



router.get('/delete-product/:id', async (req, res) => {
  await Product.deleteOne({ _id: req.params.id })
  res.redirect('/admin/')
}
)

router.get('/edit-product/:id', async (req, res) => {
  let item = await Product.findOne({ _id: req.params.id }).lean()
  console.log(item);
  res.render('admin/edit', { item })
}
)

router.post('/edit-product/:id', async (req, res) => {
  const { name, description, } = req.body
  let filter = { _id: req.params.id }

  let update = { name, description }

  let item = await Product.findOneAndUpdate(filter, update).lean()
  const params = {
    Bucket: BUCKET_NAME,
    Key: 'cat.jpg', // File name you want to save as in S3
    Body: fileContent
  };

  s3.upload()

  if (req.files) {
    let img = req.files.Image
    img.mv('./public/product-images/' + item._id + '.jpg')
  }


  res.redirect('/admin')
})





module.exports = router;
