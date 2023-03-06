import Core from './core.js';

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
    this.user_id = obj.user_id;
    this.animal_id = obj.animal_id;
  }
}

export default Adopt;