let mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/orderup", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(()=>{
  console.log('Database ready!');
})
.catch(err => console.log('Error connecting to database'));

// mongoose.connection.on('connected', ()=>{
//   console.log('Database connected to ' + process.env.DATABASE_URL);
// })

// mongoose.connection.on('error', ()=>{
//   console.log('Database connected to ' + process.env.DATABASE_URL);
// })

// mongoose.connection.on('SIGINT', ()=>{
//   console.log('Applciation stopped');
// })

// mongoose.connection.on('SIGUSR2', ()=>{
//   console.log('Applciation stopped');
// })

/**
 ** Managing multiple DBs
 */
//  let dbUrl = 'mongodb://localhost:27017/userDbase'
//  mongoose.createConection(dbUrl)