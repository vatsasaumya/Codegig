var Sequelize = require('sequelize');
module.exports = new Sequelize('gigs','root','',{
	host:'localhost',
	dialect:'mysql',
	operatorsAliases: 0,
	pool:{
		max:5,
		min:0,
		acquire:30000,
		idle:10000
	},
});