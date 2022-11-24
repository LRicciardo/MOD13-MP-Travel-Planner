const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Traveller, Trip, Location } = require('../../models');

// GET all readers
router.get('/', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll({
      include: [{ model: Location }, { model: Trip }],
      where: { id: {[Op.notin]: Trip.id}}
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single reader
router.get('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {
      include: [{ model: Location }, { model: Trip }],
      // TODO: Add a sequelize literal to get a count of short books
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a reader
router.post('/', async (req, res) => {
  try {
    const travellerData = await Traveller.create(req.body);
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a reader
router.delete('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
