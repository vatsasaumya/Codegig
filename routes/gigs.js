var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//Get gig list
router.get('/',(req,res) =>
	Gig.findAll()
	//.then returns promise
	.then(gigs => 
		res.render('gigs',{
			gigs
		}))
	.catch(err => console.log(err)));
//Display add gig form
router.get('/add',(req,res) => res.render('add'));
//add a gig
router.post('/add',(req,res) => {
	
// pulling all these attributes into data object
let { title, technologies, budget, description, contact_email } = req.body;
let errors =[];
//Validate fields
if(!title){
errors.push({text:'Please add a title'});
}
if(!technologies){
errors.push({text:'Please add some technologies'});
}
if(!description){
errors.push({text:'Please add a description'});
}
if(!contact_email){
errors.push({text:'Please add a contact email'});
}
//Check for errors
if(errors.length > 0){
	res.render('add',{
		errors,
		title,
		technologies,
		budget,
		description,
		contact_email
	});
} else{
	if(!budget){
		budget='Unknown'
	}
	else{
		budget=`$${budget}`;
	}
	//make lowercase and remove space after comma
	technologies = technologies.toLowerCase().replace(/, /g,',');
//Insert into table
/*Gig.update(
{ id : 2  } ,
	{ where:{ title: 'Simple Wordpress website' } }

)*/
Gig.create({
	title,
	technologies,
	description,
	budget,
	contact_email
})
  .then(gig => res.redirect('/gigs'))
  .catch(err => console.log(err));
}
});
Gig.sync();
//search for gigs
router.get('/search',(req,res) => {
	let {term} = req.query;
	//MAKE LOWERCASE
	term = term.toLowerCase();
	Gig.findAll({where:{technologies:{[Op.like]:'%'+term+'%'}}})
	.then(gigs => res.render('gigs',{gigs}))
	.catch(err => console.log(err));
});

module.exports = router;