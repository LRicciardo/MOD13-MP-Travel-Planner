const router = require('express').Router();
const { trip, Traveller, Trip } = require('../../models');

// GET all trips
router.get('/', async (req, res) => {
  try {
    const tripData = await Trip.findAll({});
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single trip
router.get('/:id', async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      include: [{ model: Location }, {model: Traveller}],
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with that id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a trip
router.post('/', async (req, res) => {
  try {
    const tripData = await Trip.create({
      traveller_id: req.body.traveller_id,
    });
    res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a trip
router.delete('/:id', async (req, res) => {
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with that id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;