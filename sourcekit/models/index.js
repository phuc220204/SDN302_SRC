// Gom model về 1 object: const db = require('../models'); db.Resident.find()
const db = {};
db.Account = require('./account.model');
db.Apartment = require('./apartment.model');
db.Resident = require('./resident.model');
module.exports = db;
