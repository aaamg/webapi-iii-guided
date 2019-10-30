const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//global middleware
server.use(helmet()); //third party
server.use(express.json());//built in

//three amigos 
function dateLogger(req, res, next) {
  console.log(new Date().toISOString())

  next();
}

function logger(req, res, next){

}

function gateKeeper(req, res, next) {
  // data can come in the body, url parameters, query string, headers
  // new way of reading data sent by the client
  const password = req.headers.password || '';
  if (password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(400).json({ you: 'cannot pass!!' });
  }


server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
