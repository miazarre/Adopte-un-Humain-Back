const Core = require('./core');
const client = require('../service/dbClient');

class Animal extends Core {
    static tableName = 'animal';

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.name = obj.name;
        this.resume = obj.resume;
        this.description = obj.description;
        this.needs = obj.needs;
        this.birthdate = obj.birthdate;
        this.status = obj.status;
        this.photo1 = obj.photo1;
        this.photo2 = obj.photo2;
        this.photo3 = obj.photo3;
        this.photo4 = obj.photo4;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
        this.user_id = obj.user_id;

        
    }
      // Permet de vérifier si ca existe
  async checkAnimal() {
    const sqlQuery = "SELECT * FROM \"animal\" WHERE name=$1";
    const values = [this.name];
    const response = await client.query(sqlQuery, values);
    // si j'ai une réponse c'est que l'animal a été trouvé en BDD
    if (response.rows.length == 1) {
        return true;
    }
    else {
        return false;
    }
}
}

module.exports = Animal;