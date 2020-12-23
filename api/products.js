let express = require('express'),
    Product    = require('../models/product'),
    router  = express.Router();

router.get('/', (req, res, next) => {
  Product.find({})
  .then(products => res.json(products))
  .catch(err => res.status(404).json({
    err,
    message: "Error connecting to the database"
  }))
});

router.post('/', (req, res, next)=>{
  const {name, image, description, price, category} = req.body;
  let newProduct = new Product({ name, image, description, price, category })

  newProduct.save()
  .then(product =>
    res.status(200).json({
      product,
      message: "Product created successfully"
  }))
  .catch(err =>  res.json({
    err: err,
    message: "Error creating product"
  }))
})

// Find Product By name
router.get('/name/:keyword', (req, res)=>{
  // Full Text Search Using $text
  Product.find({
    $text: {
      $search: req.params.keyword
    }
  }, {
    _id: 0,
    __v: 0
  }, (err, data)=> {
    if(err) console.log(err);
    res.json(data);
  });

  // Partial Text Search Using RegEx
  // Product.find({
  //   name: {
  //     $regex: new RegExp(req.params.keyword, "gi")
  //     // $regex: /req.params.keyword/gi
  //   }
  // }, {
  //   _id: 0,
  //   __v: 0
  // }, (err, data)=> res.json(data))
// }, (err, data)=> res.json(data)).limit(10)

  // Product.find({name: /req.params.keyword/i})
  // .then(products => res.json({data: products}))
  // .catch(err => console.log(err))
});

// Remove
router.delete('/remove/:id', (req, res)=> {
  Product.findByIdAndRemove(req.params.id, (err)=>{
    if(err) res.json({err, message: 'Error finding product'});
    // res.redirect('/menu');
    res.json({
      status: "Product Removed Successfully!"
    })
  });
})

module.exports = router;