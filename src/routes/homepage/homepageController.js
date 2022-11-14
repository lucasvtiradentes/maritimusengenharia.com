const { readFile } = require('fs');

function currentController(request, response) {
  const filePath = './src/routes/homepage/index.html';

  readFile(filePath, 'utf8', (error, page) => {
    if (error) {
      response.status(500).send('Servidor com problema');
    }

    response.send(page);
  });
}

module.exports = currentController;
