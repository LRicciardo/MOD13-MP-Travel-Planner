const sequelize = require('../config/connection');
const { Traveller, Trip, Location } = require('../models');

const travellerSeedData = require('./travellerSeedData.json');
const tripSeedData = require('./tripSeedData.json');
const locationSeedData = require('./locationSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const travellers = await Reader.bulkCreate(travellerSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of travellers) {
    const newLocation = await Location.create({
      traveller_id: id,
    });
  }

  for (const trip of tripSeedData) {
    const newTrip = await Trip.create({
      ...trip,
      traveller_id: travellers[Math.floor(Math.random() * travellers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
