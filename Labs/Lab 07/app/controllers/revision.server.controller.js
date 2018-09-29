var Revision = require("../models/revision")

module.exports.showTitleForm=function(req,res){
	res.render("titleForm.pug")
}

module.exports.getLatest=function(req,res){
	title = req.query.title;
    console.log(title);

	Revision.findTitleLatestRev(title, function(err,result){
		
		if (err){
			console.log("Cannot find " + title + ",s latest revision!")
		}else{
			// console.log(result)
			revision = result[0];
			console.log(revision);
			res.render('revision.pug',{title: title, revision:revision})
		}	
	})	

}
