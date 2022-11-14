const express = require('express');

const homepageController = require('./homepage/homepageController.js');
const aboutusController = require('./aboutus/aboutusController.js');
const customersController = require('./customers/customersController.js');
const contactController = require('./contact/contactController.js');
const userValidationController = require('./userValidation/userValidationController.js');
const showAllUsersController = require('./showAllUsers/showAllUsersController.js');
const closeWorksheetActivityController = require('./closeWorksheetActivity/closeWorksheetActivityController.js');
const showWorksheetActivityController = require('./showWorksheetActivity/showWorksheetActivityController.js');
const userAuthenticationController = require('./userAuthentication/userAuthenticationController.js');

const routes = express.Router();

routes.get('/', homepageController);
routes.get('/aboutus', aboutusController);
routes.get('/customers', customersController);
routes.get('/contact', contactController);
routes.get('/userAuthentication', userAuthenticationController);
routes.get('/userValidation', userValidationController);
routes.get('/showAllUsers', showAllUsersController);
routes.get('/showWorksheetActivity', showWorksheetActivityController);
routes.get('/closeWorksheetActivity', closeWorksheetActivityController);

module.exports = routes;

// teste
