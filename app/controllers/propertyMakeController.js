var Model = require('../model/models.js'),
	validator = require('validator'),
	addressValidator = require('address-validator'),
	_= require('underscore');
    Address = addressValidator.Address;

module.exports.show = function(req, res) {
	res.render('properties');
};

module.exports.createProperty = function(req, res) {

	var street = req.body.street;
	var zipcode = req.body.zipcode;
	var city = req.body.city;
	var state = req.body.state;
	var country = req.body.country;
	var bedrooms = req.body.bedrooms;
	var bathrooms = req.body.bathrooms;
	var parking = req.body.parking;
	var squareFootage = req.body.squareFootage;
	var rent = req.body.rent;
	var mortgage = req.body.mortgage;

	if (!validator.isNumeric(zipcode)) {
		req.flash('error', "Please, enter a valid zipcode.");
		res.redirect('properties');
	}

	if (!validator.isNumeric(bedrooms) || !validator.isInt(bedrooms, {min:0, max:15})) {
		req.flash('error', "Please, enter a valid number of bedrooms.");
		res.redirect('properties');
	}

	if (!validator.isNumeric(bathrooms) || !validator.isInt(bathrooms, {min:0, max:15})) {
		req.flash('error', "Please, enter a valid number of bathrooms.");
		res.redirect('properties');
	}

	if (!validator.isNumeric(parking)) {
		req.flash('error', "Please, enter a valid number of parking units.");
		res.redirect('properties');
	}

	if (!validator.isNumeric(squareFootage)) {
		req.flash('error', "Please, enter a valid square footage.");
		res.redirect('properties');
	}

	var testAddress = new Address({
		street: street,
		city: city,
		state: state,
		country: country
	});

    var newAddress;
    var first;
// addressValidator.match.streetAddress` -> tells the validator that you think the input should be a street address. This data makes the validator more accurate.  
	addressValidator.validate(testAddress, addressValidator.match.streetAddress, function(err, exact, inexact) {
        first = exact[0];
        if (first === null) {
			req.flash('error', "Please enter a valid address.");
			res.redirect('properties');
        }

        newAddress = {
			owner: req.user.username,
            street: first.streetNumber + " " + first.street,
            city: first.city,
            state: first.state,
            country: first.countryAbbr,
            zipcode: first.postalCode,
            latitude: first.location.lat,
            longitude: first.location.lon,
			bedrooms: bedrooms,
            bathrooms: bathrooms,
            parking: parking,
            squareFootage: squareFootage,
            rent: rent,
            mortgage: mortgage,
            fullAdress: first.streetNumber + " " + first.street + ", " + first.city + ", " + first.state + ", " + first.postalCode

        };

        Model.Property.create(newAddress).then(function(property) {
            var temp = [];
            if (req.user.properties !== null) {
                temp = req.user.properties;
            }
            temp.push(property.id);
			req.user.updateAttributes({properties: temp});
			res.redirect('/dashboard');
		}).catch(function(error) {
			req.flash('error', "Please enter the information again.");
			res.redirect('/properties');
		});


	});

	// console.log("after address validation");
	// console.log(newAddress);
 //    Model.Property.create(newAddress).then(function() {
 //        console.log("Adding to property table...");
 //        res.redirect('/dashboard');
 //    }).catch(function(error) {
 //        req.flash('error', "Please, enter a valid address.");
 //        res.redirect('/properties');
 //    });
};