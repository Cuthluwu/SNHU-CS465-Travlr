const tripsEndpoint =
  process.env.TRIPS_API_URL || 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

// GET /travel
// Requests trip data from the REST API and passes it to the Handlebars view.
const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      throw new Error(`Trip API returned HTTP ${response.status}.`);
    }

    let trips = await response.json();
    let message = null;

    if (!Array.isArray(trips)) {
      message = 'The trip service returned an unexpected response.';
      trips = [];
    } else if (trips.length === 0) {
      message = 'No trips are currently available.';
    }

    return res.render('travel', {
      title: 'Travlr Getaways',
      trips,
      message
    });
  } catch (err) {
    return res.status(500).render('travel', {
      title: 'Travlr Getaways',
      trips: [],
      message: `The trip information could not be loaded. ${err.message}`
    });
  }
};

module.exports = {
  travel
};
