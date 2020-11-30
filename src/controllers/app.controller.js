const fetch = require('node-fetch');

const {
  subscribeDetail
} = require('../helpers/inputChecker');


let records = new Map();

// Subscribe controller
exports.subscribeController = (req, res) => {
  const { error } = subscribeDetail.validate(req.body);
  if (error) {
    return res.status(401).json({
      success: false,
      message: error.details[0].message
    });
  }

  const topic = req.params.topic;
  const url = req.body.url;

  if (records.has(topic)) {
    if (!records.get(topic).includes(url)) {
      records.get(topic).push(url);
    }
  } else {
    records.set(topic, [ url ]);
  }
  
  return res.json({ 
    success: true, 
    message: `Subscription successful` 
  });
}


// Publisher controller
exports.publishController = (req, res) => {
  const topic = req.params.topic;
  const bodyDetail = req.body;

  const publishList = records.get(topic);

  for (let i = 0; i < publishList.length; i++) {

    // Call post request here
    const makeRequest = async () => {
      const response = await fetch(`${publishList[i]}`, {
        method: 'POST',
        body: JSON.stringify(bodyDetail),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response);
    }
    makeRequest();
  }

  return res.json({ 
    success: true, 
    message: `Sending message to subscribers` 
  });
}

exports.eventController = (req, res) => {
  console.log('result => ', req.body);
}
