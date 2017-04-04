var PropertyManagerMeta = require('./PropertyManager.js'),
	TenantMeta = require('./Tenant.js'),
	PropertyMeta = require('./Property.js'),
    connection = require('../sequelize.js');

// models defined with sequelize.define ('name', {attributes}, {options})
var PropertyManager = connection.define('propertymanagers', PropertyManagerMeta.attributes, PropertyManagerMeta.options);
var Tenant = connection.define('tenants', TenantMeta.attributes, TenantMeta.options);
var Property = connection.define('properties', PropertyMeta.attributes, PropertyMeta.options);
// you can define relationships here

module.exports.PropertyManager = PropertyManager;
module.exports.Tenant = Tenant;
module.exports.Property = Property;