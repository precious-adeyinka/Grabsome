let express = require('express'),
    User    = require('../models/user'),
    router  = express.Router(),
    bcrypt  = require('bcrypt');

// Get All Users
router.get('/', (req, res, next) => {
  User.find({})
  .then(users => res.json({
    data: users
  }))
  .catch(err => res.status(404).json({
    err,
    message: "Error connecting to the database"
  }))
});

// Create User
router.post('/', async (req, res, next)=>{
  try {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = new User({
      name, email, password: hashedPassword
    })

    newUser.save()
    .then(user =>
      res.status(200).json({
        user: user,
        message: "User created successfully"
    }))
    .catch(err =>  res.json({
      err: err,
      message: "Error creating user"
    }))
    // res.status(201).send();
  }
  catch {
    res.status(500).send();
  }
})

// Authenticate User
router.post('/authenticate', (req, res)=> {
  const {email, password} = req.body;
  User.findOne({email: {$regex: new RegExp(email, "gi")}}).then(async (user) => {
    try {
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).json({user, message: "Logged in Successfully"});
        // res.redirect('/menu');
      }
      else {
        res.status(301).json({
          message: 'Operation Blocked - You Are Not Allowed!'
        })
      }
    }
    catch {
      res.status(500).send();
    }
  }).catch(err => res.status(404).json({
    err: err,
    message: "Invalid User"
  }))
})

// Remove User
router.delete('/remove/:id', (req, res)=> {
  User.findByIdAndRemove(req.params.id, (err)=>{
    if(err) console.log(err);
    res.json({
      status: "User Removed Successfully!"
    })
  });
})

module.exports = router;