// Bring in the database connection and Trip model.
const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

const tripsPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

// Replace the old sample records so repeated tests stay predictable.
const seedDatabase = async () => {
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
};

seedDatabase()
  .then(async () => {
    console.log(`Loaded ${trips.length} trip records into the travlr database.`);
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('Unable to seed the database:', err.message);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
