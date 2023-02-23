const Core = require('./core');
const client = require('../service/dbClient');

class Adopt extends Core {
    static tableName = 'adoption';

  constructor(obj) {
    super(obj);
    this.id = obj.id;
    this.comment = obj.comment;
    this.form1 = obj.form1;
    this.form2 = obj.form2;
    this.form3 = obj.form3;
    this.status = obj.status;
    this.date_adopt = obj.date_adopt;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
    this.user_id = obj.user_id;
    this.animal_id = obj.animal_id;
  }
}

module.exports = Adopt;