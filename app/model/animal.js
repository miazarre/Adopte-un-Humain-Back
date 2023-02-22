const Core = require('./core');
const client = require('../service/dbClient');

class Animal extends Core {
    static tableName = 'animal';

    constructor(obj){
        super(obj);
        this.id = obj.id;
        
    }
}

module.exports = Animal;