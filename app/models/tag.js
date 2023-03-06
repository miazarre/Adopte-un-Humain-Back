import Core from './core.js';
import client from '../service/dbClient.js';

class Tag extends Core {
    static tableName = 'tag';

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.name = obj.name;
        this.priority = obj.priority
    }
    // Permet de vérifier si le nom existe
    async checkTag() {
        const sqlQuery = "SELECT * FROM \"tag\" WHERE name=$1";
        const values = [this.name];
        const response = await client.query(sqlQuery, values);
        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
        if (response.rows.length == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    // Permet de vérifier si l'id existe
    async checkTagId(id) {
        const sqlQuery = "SELECT * FROM \"tag\" WHERE id=$1";
        const values = [id];
        const response = await client.query(sqlQuery, values);
        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
        if (response.rows.length == 1) {
            return true;
        }
        else {
            return false;
        }
    }
}

export default Tag;