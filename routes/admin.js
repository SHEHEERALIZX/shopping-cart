var express = require('express');
var router = express.Router();
const product = require('../models/product')


/* GET home page. */
router.get('/', function (req, res, next) {


  res.render('index', { admin: true });
});

router.get('/add', function (req, res, next) {

  res.render('add-product', { admin: true });
});

router.post('/add', async function (req, res, next) {



  const { name, image, description } = req.body

  let item = await product.create({
    name,
    image,
    description
  })
  if (req.files) {
    let img = req.files.Image
    img.mv('./public/product-images/' + item.id + '.jpg')
  }
  // console.log(item.id);
  res.redirect('/admin/add')


});



module.exports = router;
