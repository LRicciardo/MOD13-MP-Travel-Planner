const Traveller = require('./Traveller');
const Trip = require('./Trip');
const Location = require('./Location');

Traveller.belongsToMany(Location, {
// the third table is known as the through table
// use this table to link the two tables
  through: {
    model: Trip,
    unique: false
  },
  as: "planned_trips"
});

Location.belongsToMany(Traveller, {
  through: {
    model: Trip,
    unique: false
  },
  as: "location_travellers"
});

Location.belongsTo(Trip, {
  foreignKey: 'traveller_id',
});

module.exports = { Traveller, Trip, Location };
