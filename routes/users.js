var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
const Product = require('../models/product')
const User = require('../models/users')



/* GET home page. */
router.get('/', async function (req, res, next) {

  if (req.session) {
    let user = req.session.user
    if (user) {
      let username = user.username
      let items = await Product.find().lean()
      console.log(user);
      if (items) {
        res.render('index', { items, username });

      }
    }
    else {
      let items = await Product.find().lean()
      console.log(user);
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
    console.log(req.body)

    // validate user input 
    if (!(email && password)) {
      res.status(400).send("All input requireed you fool");

    }


    // check user available in database

    const user = await User.findOne({
      email
    })
    console.log(user)

    if (user) {

      if (email && (await bcrypt.compare(password, user.password))) {
        req.session.user = user
        console.log(req.session.user)
        req.session.logginErr = true
        res.redirect('/login')
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



module.exports = router;


