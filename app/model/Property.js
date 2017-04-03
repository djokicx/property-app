var Sequelize = require('sequelize');


/*
Owner (Property Manager)

Full Address {Street Address; ZIP Code; City; State; Latitude**; Longitude**;}

Property Overview {(PK) Address, number of units, …, Purchase Price, Square Footage, Price/sqft, Tenants; Capacity, monthly occupancy rates, Date Acquired,…(Financial ie. annualized return);}

Unit Features { Unit # (ie. appt. number) Bedrooms#; Bathrooms#; Parking#; Square Footage; Tenants; Capacity, monthly occupancy rates}

Bedroom {Square Footage; Amount per Month; Amount due Overall; Amount due per Month (Historic); Security Deposit; Maintenance Expense; Assigned Tenant; Maintenance Request;}

Financial {Property Purchase Price; Gross Operating Income (Revenue); Operating Expenses {Property Tax; Insurance; Maintenance Expense}, Net Operating Income; ROI;}
*/
var attributes = {
  owner: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
  },
  streetName: {
    type: Sequelize.STRING,
  },
  streetNumber: {
    type: Sequelize.STRING,
  },
  zipcode: {
    type: Sequelize.INTEGER,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.INTEGER,
  },
  longitude: {
    type: Sequelize.INTEGER,
  },
  bedrooms: {
    type: Sequelize.INTEGER,
  },
  bathrooms: {
    type: Sequelize.INTEGER,
  },
  parking: {
    type: Sequelize.INTEGER,
  },
  squareFootage: {
    type: Sequelize.INTEGER,
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
  },
  grossOperatingIncome: {
    type: Sequelize.INTEGER,
  },
  opeartingExprenses: {
    type: Sequelize.INTEGER,
  },
  netOperatingIncome: {
    type: Sequelize.INTEGER,
  },
  ROI: {
    type: Sequelize.INTEGER,
  }
};

var options = {
  freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;