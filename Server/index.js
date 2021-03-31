const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>🌈 Elad 🌟 Bar 🌞 </h1>');
});

app.post('/', (req, res) => {
  const get_data = async () => {
    const response = await axios.get(
      `https://www.metaweather.com/api/location/search/?lattlong=${req.body.lat},${req.body.long}`
    );
    const dataWoeid = await axios.get(
      `https://www.metaweather.com/api/location/${response.data[0].woeid}/`
    );
    console.log(dataWoeid.data);
    res.status(200).json(dataWoeid.data);
  };
  get_data();
});

app.listen(port, () => {
  console.log('Server running...');
});
