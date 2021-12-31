var express = require('express');
var router = express.Router();
const Product = require('../models/product')


/* GET home page. */
router.get('/', async function(req, res, next) {

  let items = await Product.find().lean()


  res.render('admin/view-products', { items,admin: true });
});

router.get('/add', function (req, res, next) {

  res.render('admin/add-product', { admin: true });
});

router.post('/add', async function (req, res, next) {



  const { name, image, description } = req.body

  let item = await Product.create({
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



router.get('/delete-product/:id',async (req,res)=>{
  await Product.deleteOne({_id:req.params.id})
  res.redirect('/admin/')
}
)

router.get('/edit-product/:id', async(req,res)=>{
  let item = await Product.findOne({_id:req.params.id}).lean()
  console.log(item);
  res.render('admin/edit',{ item })
} 
)

router.post('/edit-product/:id',async(req,res)=>{
  const { name ,description,}=req.body
  let filter = {_id:req.params.id}

  let update = {name,description}
  
  let item = await Product.findOneAndUpdate(filter,update).lean()

  if (req.files) {
    let img = req.files.Image
    img.mv('./public/product-images/' + item._id + '.jpg')
  }
  

  res.redirect('/admin')
})





module.exports = router;
   