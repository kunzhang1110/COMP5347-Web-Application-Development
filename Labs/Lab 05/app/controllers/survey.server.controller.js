var express = require('express')

function showForm(req,res){
  products = req.app.locals.products; //each request object has a reference to application scope variables
  res.render('survey.ejs',{products:products});
}

function showResult (req,res){
//  console.log(req.body);
  products = req.app.locals.products;
  productidx = req.body.vote;
  surveyresults = req.app.locals.surveyresults; 
  sess = req.session;
  console.log(surveyresults)
  console.log(req.session)
  if("vote" in sess){
    res.render('surveyresult.ejs', {products: products, surveyresults: surveyresults, voted:1, productidx:sess.vote}) 
  }else{
    sess.vote = productidx;
    if (req.body.gender==1){
      surveyresults.fp[productidx] += 1
    }else{
      surveyresults.mp[productidx] += 1    
    }
    res.render('surveyresult.ejs', {products: products, surveyresults: surveyresults, voted:0, productidx:sess.vote})
  }
}
  
module.exports = {
  showResult,
  showForm
};

