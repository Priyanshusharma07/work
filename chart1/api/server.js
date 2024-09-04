const express = require('express');
const app = express();
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');


app.use(cors()); 
async function fetchData() {

  let jsonData;  
  try {
    const response = await axios.get('https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms');
    const xmldata = response.data;  

    //  XML to JSON
    xml2js.parseString(xmldata, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
      } else {
        jsonData = result; 
        // console.log('Parsed JSON data:', jsonData);  
      }
    });
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


app.get('/',async (req, res) => {
  //   console.log("Here is the parsed data:");
  //   console.log(jsonData);  // Log parsed data to console
  
  let da=await fetchData();

  if (da) {
    res.status(200).json({ message:"data", da });
    // res.status(200).json({error: 'Password does not match'});
    // res.json(jsonData);  
  } else {
    res.send("Data is still loading or an error occurred.");
  }
});



app.listen(3000);
