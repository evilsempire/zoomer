const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.post('/api/generateToken', (req, res) => {

  try {
    const token = jwt.sign({
      "iss": req.body.apiKey, //api key
      "exp": 1496091964000
    }, req.body.apiSecret); //api secret
    res.status(200).send({ token });
  } catch (ex) {
    res.status(401).send({ token: '' })
  }

});

app.post('/api/createMeeting', (req, res) => {
  axios(`https://api.zoom.us/v2/users/${req.body.email}/meetings`, {
    method: 'POST',
    data: JSON.stringify({
      topic: req.body.topic,
      type: req.body.type,
      start_time: req.body.start_time,
      password: req.body.password,
      agenda: req.body.agenda,
    }),
    headers: {
      'content-type': req.headers['content-type'],
      'authorization': req.headers['authorization']
    }
  }).then(result => res.status(200).send(result.data))
  .catch(err => res.status(401).send(err))
});

app.post('/api/listMeetings', (req, res) => {
  axios(`https://api.zoom.us/v2/users/${req.body.email}/meetings?page_size=30&type=2`, {
    method: 'GET',
    headers: {
      'content-type': req.headers['content-type'],
      'authorization': req.headers['authorization']
    }
  }).then(result => res.status(200).send(result.data))
    .catch(err => res.status(401).send(err))
});


app.listen(port, () => console.log(`Listening on port ${port}`));