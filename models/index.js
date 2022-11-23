const Traveller = require('./Traveller');
const Trip = require('./Trip');
const Location = require('./Location');

Traveller.hasOne(Location, {
  foreignKey: 'traveller_id',
  onDelete: 'CASCADE',
});

Traveller.hasMany(Trip, {
  foreignKey: 'traveller_id',
  onDelete: 'CASCADE',
});

Trip.belongsTo(Traveller, {
  foreignKey: 'traveller_id',
});

Location.belongsTo(Traveller, {
  foreignKey: 'traveller_id',
});

module.exports = { Traveller, Trip, Location };
