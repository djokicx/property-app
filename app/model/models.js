var PropertyManagerMeta = require('./PropertyManager.js'),
	TenantMeta = require('./Tenant.js')
    connection = require('../sequelize.js');

// models defined with sequelize.define ('name', {attributes}, {options})
var PropertyManager = connection.define('propertyManagers', PropertyManagerMeta.attributes, PropertyManagerMeta.options);
var Tenant = connection.define('tenants', TenantMeta.attributes, TenantMeta.options);

// you can define relationships here

module.exports.PropertyManager = PropertyManager;
module.exports.Tenant = Tenant;