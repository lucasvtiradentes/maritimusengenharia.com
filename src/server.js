const express = require('express');
const routes = require('./routes/routes.js');

const port = process.env.PORT || 3000;
const server = express();

server.use('/customers', express.static(`${__dirname}/routes/customers`));
server.use('/aboutus', express.static(`${__dirname}/routes/aboutus`));
server.use('/homepage', express.static(`${__dirname}/routes/homepage`));
server.use('/contact', express.static(`${__dirname}/routes/contact`));
server.use('/', express.static(__dirname));

server.use(express.json());
server.use(routes);

server.listen(port, function () {
  console.log('server listening on port ' + port);
});
