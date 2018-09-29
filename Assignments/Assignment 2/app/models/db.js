// connecting database and require mongoose

var mongoose = require('mongoose');
var url = 'mongodb://localhost/db_wikilatic'//default port 27017


//connect to database db_wikilatic
mongoose.connect(url).then(()=>{
  console.log('Database connected');
}).catch(err=>{
    console.log('Database connection failed')
})

module.exports = mongoose;


//connect to database db_wikilatic
//mongoose.connect(url, err => {
//  if (err){
//    console.log('db_wikilatic connection failed')
//  }else{
//    console.log('db_wikilatic connected')
//  }
//});