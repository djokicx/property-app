var Model = require('../model/models.js'),
	validator = require('validator'),
	addressValidator = require('address-validator'),
	_= require('underscore');
    Address = addressValidator.Address;

module.exports.show = function(req, res) {
	res.render('properties');
};

module.exports.create = function(req, res) {
	var streetNumber = req.body.streetNumber;
	var street = req.body.street;
	var zipcode = req.body.zipcode;
	var city = req.body.city;
	var state = req.body.state;
	var country = req.body.country;
	var bedrooms = req.body.bedrooms;
	var bathrooms = req.body.bathrooms;
	var parking = req.body.parking;
	var squareFootage = req.body.squareFootage;

	if (!validator.isNumeric(zipcode)) {
		req.flash('error', "Please, enter a valid zipcode.");
	}

	if (!validator.isNumeric(bedrooms) || !validator.isInt(bedrooms, {min:0, max:15})) {
		req.flash('error', "Please, enter a valid number of bedrooms.");
	}

	if (!validator.isNumeric(bathrooms) || !validator.isInt(bathrooms, {min:0, max:15})) {
		req.flash('error', "Please, enter a valid number of bathrooms.");
	}

	if (!validator.isNumeric(parking)) {
		req.flash('error', "Please, enter a valid number of parking units.");
	}

	if (!validator.isNumeric(squareFootage)) {
		req.flash('error', "Please, enter a valid square footage.");
	}

	var testAddress = new Address({
		street: streetNumber + ' ' + street,
		city: city,
		state: state,
		country: country
	});

    var newAddress;
    console.log("before validating address");
// addressValidator.match.streetAddress` -> tells the validator that you think the input should be a street address. This data makes the validator more accurate.  
	addressValidator.validate(testAddress, addressValidator.match.streetAddress, function(err, exact, inexact) {
        var first = exact[0];
        console.log("first.street"); console.log(first.street);
        console.log("first.location.lat"); console.log(first.location.lat);
        // for (var i = 0; i <= exact.length; i++) {
			// console.log(exact[i]);
        // }

        newAddress = {
            streetNumber: exact.streetNumber,
            streetName: exact.street,
            city: exact.city,
            state: exact.state,
            country: exact.country,
            zipcode: exact.postalCode
        };
	});

    Model.Property.create(newAddress).then(function() {
        res.redirect('/properties');
    }).catch(function(error) {
        req.flash('error', "Please, enter a valid address.");
        res.redirect('/properties');
    });
};