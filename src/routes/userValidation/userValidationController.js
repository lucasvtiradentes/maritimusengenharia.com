const mongodb = require('mongodb');
require('dotenv').config();

async function currentController(request, response) {

  const {computerName, userName, worksheetType, worksheetName, currentDate, currentTime} = request.query;
  const {DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME} = process.env;

  const dbUrl = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?authSource=${DATABASE_NAME}`;
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  // -----------------------------------------------------------------------
  console.log(request.protocol + '://' + request.get('host') + request.originalUrl);

  try{

    const mongo = mongodb.MongoClient;
    const database = await mongo.connect(dbUrl, dbOptions);

    // -----------------------------------------------------------------------
    const documentsArray = await database.db(DATABASE_NAME).collection('allowedUsers').find({computerName, userName}).toArray();
    const validationResponse = documentsArray.length == 0 ? false : true;

    // -----------------------------------------------------------------------
    if (validationResponse){
      console.log(`user ${computerName + '/' + userName} was allowed`);
      await database.db(DATABASE_NAME).collection('worksheetActivity').insertOne({computerName, userName, worksheetType, worksheetName, currentDate, currentTime});
      response.status(200).send('OK');
    } else {
      console.log(`user ${computerName + '/' + userName} was denied`);
      await database.db(DATABASE_NAME).collection('forbiddenUsers').insertOne({computerName, userName, worksheetType, worksheetName, currentDate, currentTime});
      response.status(403).send('Forbidden');
    }

    database.close();

  } catch (error) {
    console.log('Error');
    response.status(200).send('Error');
  }
}

module.exports = currentController;
