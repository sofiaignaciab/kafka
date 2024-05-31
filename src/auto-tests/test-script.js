const axios = require('axios');

const API_URL = 'http://localhost:3001/solicitudes';
const NUM_REQUESTS = 5;

function getRandomId() {
  return Math.floor(Math.random() * 5206091) + 1;
}

function getRandomEmail() {
  const domains = ['example.com', 'test.com', 'demo.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const username = Math.random().toString(36).substring(7);
  return `${username}@${domain}`;
}

async function simulateRequest() {
  const solicitud = {
    correo: getRandomEmail(),
    itemid: getRandomId()
  };

  try {
    const response = await axios.post(API_URL, solicitud);
    console.log(`Request created: ${response.data.id}`);
  } catch (error) {
    console.error('Error creating the request:', error.response ? error.response.data : error.message);
  }
}

async function runSimulations() {
  const requests = [];
  for (let i = 0; i < NUM_REQUESTS; i++) {
    requests.push(simulateRequest());
  }

  await Promise.all(requests);
  console.log('All requests have been processed');
}

runSimulations();