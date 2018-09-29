var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wiki', function () {
  console.log('mongodb connected')
});

module.exports = mongoose;