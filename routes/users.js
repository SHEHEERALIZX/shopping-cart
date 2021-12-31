var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
const Product = require('../models/product')
const User = require('../models/users')
const Cart = require('../models/cart');


// const verifyLogin=(req,res,next)=>{
//   if(req.session.loggedIn){
//     next()
//   }else{
//     res.redirect('/login')

//   }
// }




/* GET home page. */
router.get('/', async function (req, res, next) {

  if (req.session) {
    let user = req.session.user
    if (user) {
      let username = user.username
      let items = await Product.find().lean()
      if (items) {
        res.render('index', { items, username });

      }
    }
    else {
      let items = await Product.find().lean()
      if (items) {
        res.render('index', { items });

      }
    }

  }
  else {
    let items = await Product.find().lean()
    res.render('index', { items });
  }

});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/')

  } else {

    res.render('users/login', { "error": req.session.logginErr })
    req.session.logginErr = false

  }

})

router.post('/login', async (req, res) => {

  try {
    const { email, password } = req.body;


    // validate user input 
    if (!(email && password)) {
      res.status(400).send("All input requireed you fool");

    }


    // check user available in database

    const user = await User.findOne({
      email
    })


    if (user) {

      if (email && (await bcrypt.compare(password, user.password))) {
        req.session.user = user

        req.session.loggedIn=true
        res.redirect('/')
      } else {

        req.session.logginErr = true
        res.redirect('/login')
      }


    } else {
      req.session.logginErr = true
      res.redirect('/login')

    }
    res.redirect('/')




  } catch (err) {
    console.log(err);

  }


})




router.get('/signup', (req, res) => {
  if (req.session.user) {
    res.redirect('/')
  }
  else {
    res.render('users/signup')

  }
})

router.post('/signup', async (req, res) => {




  try {
    const { username, email, password } = req.body;

    if (!(email && password && username)) {
      res.status(400).send("All input is required")
      // 404 bad request

    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login")
    }

    // Encrypt User password

    encryptedPassword = await bcrypt.hash(password, 10)

    // all validation is done then save to database

    const obj = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    req.session.user = obj

    res.redirect('/');



  } catch (err) {
    console.log(err);
  }




})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

// add to cart route  


router.get('/add-to-cart/:uuid', async (req, res) => {
  console.log(req.session.loggedIn)

  if (req.session.loggedIn) {

    let userId = req.session.user._id

    let prodId = req.params.uuid



    let userCart = await Cart.findOne({ user: userId })
    console.log(userCart);

    if (userCart) {
      userCart.products.push(prodId)
      userCart.clicks++
      userCart.save();
     

    } else {
      let cartObj = {
        user: userId,
        products: [prodId]
      }

      let c = await Cart.create(cartObj)


    }
    res.redirect('/')
  }
  else{
    res.redirect('/login')
  }


}
)

// get cart collection route 

router.get('/cart',async (req,res)=>{
   

  let cart = await Cart.findOne({user:req.session.user._id})

  console.log(cart.products[0])
  
  let products = await Product.find({_id:cart.products[1]}).lean()
  
  console.log(products)
  res.end('Successfull')
      

})


module.exports = router;


