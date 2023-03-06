import Core from './core.js';
import client from '../service/dbClient.js';

class Role extends Core {
    static tableName = 'role';

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.name = obj.name;
    }
    // Permet de vérifier si ca existe
    async checkRole() {
        const sqlQuery = "SELECT * FROM \"role\" WHERE name=$1";
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

}

export default Role;