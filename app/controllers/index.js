const animalsController = require("./animals");
const usersController = require("./users");
const authController = require("./auth");
const tagsController = require("./tags");
const rolesController = require("./roles");

module.exports =  { 
    authController,
    usersController,
    animalsController,
    tagsController,
    rolesController
 };