var express = require('express');
var router = express.Router();
const Product = require('../models/product')
const User = require('../models/users')



/* GET home page. */
router.get('/', async function(req, res, next) {
  

  let items = await Product.find().lean()


  // let items = [
  //   {
  //     name:"Acer Predator Helios 3000",
  //     img:"https://rukminim1.flixcart.com/image/416/416/kuvkcy80/computer/x/s/4/na-gaming-laptop-acer-original-imag7whp2f8fgpaz.jpeg?q=70",
  //     category:"Laptop",
  //     desc:"acer Predator Helios 300 Octa Core i7 10th Gen - (16 GB/1 TB HDD/256 GB SSD/Windows 10 Home/6 GB Graphics/NVIDIA GeForce RTX 3060/144 Hz) PH315-53 Gaming Laptop  (15.6 inch, Black, 2.3 kg)"
  //   },
  //   {
  //     name:"Mi NoteBook Pro",
  //     img:"https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1632306269.33689092.jpg",
  //     category:"Laptop",
  //     desc:"8GB RAM + 512GB NVMe SSD, i5 11th Gen + Iris Xe Graphics"
  //   },
  //   {
  //     name:"Macbook Pro",
  //     img:"https://images-eu.ssl-images-amazon.com/images/I/313CFbI-YjL._SY445_SX342_QL70_FMwebp_.jpg",
  //     category:"Laptop",
  //     desc:"2020 Apple MacBook Pro (13.3-inch/33.78 cm, Apple M1 chip with 8‑core CPU and 8‑core GPU, 8GB RAM, 256GB SSD) - Space Grey"
  //   },
  //   {
  //     name:"ASUS VivoBook Ultra Ryzen 5 Hexa Core 5500U",
  //     img:"https://rukminim1.flixcart.com/image/416/416/kmgn0cw0/computer/p/q/o/na-thin-and-light-laptop-asus-original-imagfcpagxqqe6zs.jpeg?q=70",
  //     category:"Laptop",
  //     desc:" - (8 GB/512 GB SSD/Windows 10 Home) KM413UA-EB502TS Thin and Light Laptop  (14 inch, Indie Black, 1.40 kg, With MS Office)"
  //   },
  // ]

  // console.log(items)


  if(items){
  res.render('index',{items});

  }
  res.render('index');
});

module.exports = router;
 