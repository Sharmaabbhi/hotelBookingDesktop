const express = require('express');
const cors = require('cors');
const fs = require('fs');
const Papa = require('papaparse');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable Cross-Origin requests

// Route to retrieve hotel bookings from the CSV file
app.get('/api/bookings', (req, res) => {
  const csvPath = './hotel_bookings_1000.csv'; // Path to the CSV file

  // Read the CSV file asynchronously
  fs.readFile(csvPath, 'utf8', (err, csvData) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load CSV file' });
    }

    // Parse CSV content using PapaParse
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: (parsedResult) => {
        res.json(parsedResult.data); // Send parsed CSV data as JSON
      },
      error: (parseError) => res.status(500).json({ error: parseError.message }),
    });
  });
});

// Launch server
app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
