const Core = require('./core');
const client = require('../service/dbClient');

class Avatar extends Core {
    static tableName = 'avatar';

  constructor(obj) {
    super(obj);
    this.id = obj.id;
    this.name = obj.name;
    this.picture = obj.picture;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }
}

module.exports = Avatar;