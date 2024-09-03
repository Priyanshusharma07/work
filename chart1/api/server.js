const express = require('express');
const app = express();
const axios = require('axios');
const xml2js = require('xml2js');  // Import xml2js

let jsonData;  // Variable to store parsed JSON data

async function fetchData() {
  try {
    const response = await axios.get('https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms');
    const xmldata = response.data;  // Fetch XML data

    // Parse XML to JSON
    xml2js.parseString(xmldata, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
      } else {
        jsonData = result;  // Store the parsed JSON data
        // console.log('Parsed JSON data:', jsonData);  // Optional: Log parsed data
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();

app.get('/', (req, res) => {
//   console.log("Here is the parsed data:");
//   console.log(jsonData);  // Log parsed data to console

  if (jsonData) {
        res.status(200).json({ message: 'Data', jsonData });
    // res.json(jsonData);  // Send JSON data as a response
  } else {
    res.send("Data is still loading or an error occurred.");
  }
});


app.listen(3000);
