 /**
 * The file to start a server
 *
 */

var express = require('express');
var path = require('path')

var app = express()

app.set('views', path.join(__dirname,'app','views'));
app.use(express.static(path.join(__dirname, 'public')));
	
app.get('/',function(req,res){
	res.render("entry.pug")
})

app.get('/data', function(req, res){
	var val = {'Nitrogen': 0.78, 'Oxygen': 0.21, 'Other': 0.01}
	res.json(val);
});

app.listen(3000, function () {
	  console.log('Plot app listening on port 3000!')
	})
	
module.exports = app;