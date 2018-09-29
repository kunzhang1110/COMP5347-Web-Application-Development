var Revision = require("../models/revision");

module.exports.getByTitle=function(req,res){
    title = req.params.title;
	Revision.getByTitle(title,function(err,result){
        if (err){
            console.log("Cannot find revisions of title: " + title);
        }
        else{
        	res.json(result);
        } })
}