const Trip = require('../models/travlr');

const requiredFields = [
  'code',
  'name',
  'length',
  'start',
  'resort',
  'perPerson',
  'image',
  'description'
];

const missingFields = (body) => requiredFields.filter((field) => {
  return body[field] === undefined || body[field] === null || body[field] === '';
});

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ code: 1 }).exec();
    if (!Array.isArray(trips) || trips.length === 0) {
      return res.status(404).json({ message: 'No trips were found.' });
    }
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
  try {
    const trips = await Trip.find({ code: req.params.tripCode }).exec();
    if (!Array.isArray(trips) || trips.length === 0) {
      return res.status(404).json({
        message: `No trip was found with code ${req.params.tripCode}.`
      });
    }
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/trips
const tripsAddTrip = async (req, res) => {
  try {
    const missing = missingFields(req.body);
    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing required field(s): ${missing.join(', ')}`
      });
    }

    const existingTrip = await Trip.findOne({ code: req.body.code }).exec();
    if (existingTrip) {
      return res.status(409).json({
        message: `Trip code ${req.body.code} already exists.`
      });
    }

    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(trip);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
  try {
    const missing = missingFields(req.body);
    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing required field(s): ${missing.join(', ')}`
      });
    }

    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true, runValidators: true }
    ).exec();

    if (!trip) {
      return res.status(404).json({
        message: `No trip was found with code ${req.params.tripCode}.`
      });
    }

    return res.status(201).json(trip);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE /api/trips/:tripCode
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({
        message: `No trip was found with code ${req.params.tripCode}.`
      });
    }

    return res.status(200).json({
      message: `Trip ${req.params.tripCode} was deleted.`,
      trip
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
