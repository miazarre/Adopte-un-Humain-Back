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
  
  // Permet de vérifier si ca existe
  async checkAvatar() {
      const sqlQuery = "SELECT * FROM \"avatar\" WHERE name=$1";
      const values = [this.name];
      const response = await client.query(sqlQuery, values);
      // si j'ai une réponse c'est que l'avatar a été trouvé en BDD
      if (response.rows.length == 1) {
          return true;
      }
      else {
          return false;
      }
  }

}

module.exports = Avatar;