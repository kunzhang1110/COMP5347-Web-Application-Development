var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipedia',function () {
	  console.log('mongodb connected')
	});

var revSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
			    versionKey: false 
		});

var Revision = mongoose.model('Revision', revSchema, 'revisions');

//Update Example
//for all documents with 'anon' field, we set the value of 'anon' to 'yes'
// see:http://mongoosejs.com/docs/documents.html

/*
Revision.update({'anon':{'$exists':true}},
	{$set:{'anon':'yes'}},{'multi':true},function(err,result){
		if (err){
			console.log("Update error!")
		}else{
			console.log(result);
		}	
	})

*/

//Find distinct registered users from article "CNN"
Revision.distinct('user', {'anon':{'$exists':false},'title':'CNN'}, function(err,users){
	if (err){
		console.log("Query error!")
	}else{
		console.log("There are " + users.length + " distinct users in CNN");
	}	
});

//Find earliest revision of "CNN"

Revision.find({'title':'CNN'})
	.sort({'timestamp':1})
	.limit(1)
	.exec(function(err,result){
	if (err){
		console.log("Query error!")
	}else{
		console.log("The earliest revision in CNN is:");
		console.log(result)
	}	
});

/*
 * aggregation example shell command
 * 
 * db.getCollection('revisions').aggregate([
	{$match:{title:"CNN"}},
	{$group:{_id:"$user", numOfEdits: {$sum:1}}},
	{$sort:{numOfEdits:-1}},
	{$limit:5}
])

APIs see: http://mongoosejs.com/docs/api.html#aggregate-js

*/

var topCNNUserPipeline = [
	{'$match':{title:"CNN"}},
	{'$group':{'_id':"$user", 'numOfEdits': {$sum:1}}},
	{'$sort':{numOfEdits:-1}},
	{'$limit':5}	
];

Revision.aggregate(topCNNUserPipeline, function(err, results){
	if (err){
		console.log("Aggregation Error")
	}else{
		console.log("The top users in CNN is: ");
		console.log(results)
	}
})

//find the user who made the most non-minor revisions on article "CNN"

