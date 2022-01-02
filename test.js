router.get('/', async function (req, res, next) {
    if(req.user || req.session){
      console.log("Google loggin "+ req.user.displayName);

      
  
    }
  
    else if (req.session) {
      let user = req.session.user
      if (user) {
        let username = user.username
        let items = await Product.find().lean()
        if (items) {
          res.render('index', { items, username  });
  
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
  

  router.get('/',(req,res)=>{
      if(req.user || req.session.user){
        let items = await Product.find().lean()

          if(req.user){
            const username = req.user.displayName
            res.render('index', { items , username});
              
          } 

          else if (req.session.user) {
            const username = req.session.user
            res.render('index', { items , username});

          }
          
          else {
             res.render('index', { items });

          }

      }

      else {

        let items = await Product.find().lean()
        res.render('index', { items });

      }
  })