var Sequelize = require('sequelize');
const db = require('../config/database');
var Gig = db.define('gig',
{
	title: Sequelize.STRING,
	technologies: Sequelize.STRING,
	description: Sequelize.STRING,
	budget: Sequelize.STRING,
	contact_email: Sequelize.STRING
 },
	 {
	  tableName: 'gigs',
	  freezeTableName: true , 
	  timestamps: false
}
);
module.exports = Gig;
//gig is not table name