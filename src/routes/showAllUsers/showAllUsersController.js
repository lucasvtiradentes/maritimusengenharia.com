const mongodb = require('mongodb');
require('dotenv').config();

async function currentController(request, response) {

  const {DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME} = process.env;

  const dbUrl = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?authSource=${DATABASE_NAME}`;
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  // -----------------------------------------------------------------------
  console.log(request.protocol + '://' + request.get('host') + request.originalUrl);
  console.log(dbUrl);

  try {

    const mongo = mongodb.MongoClient;
    const database = await mongo.connect(dbUrl, dbOptions);

    // -----------------------------------------------------------------------
    const documentsArray = await database.db(DATABASE_NAME).collection('allowedUsers').find({}).toArray();

    // -----------------------------------------------------------------------
    response.status(200).send(documentsArray);
    database.close();

  } catch (error) {
    console.log('Error');
    response.status(200).send('Error');
  }


}

module.exports = currentController;
