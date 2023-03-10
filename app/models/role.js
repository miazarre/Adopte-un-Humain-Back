import Core from './core.js';
import client from '../service/dbClient.js';
import debug from 'debug';
const log = debug('model:role');

class Role extends Core {
    static tableName = 'role';

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.name = obj.name;
    }
    // Permet de vérifier si le role existe
    static async checkRole(req) {
        try {
            const sqlQuery = "SELECT * FROM \"role\" WHERE name=$1";
            const values = [req.name];
            const response = await client.query(sqlQuery, values);
            if (response.rows.length == 1) {                        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
                return true;
            }
            else {
                return false;
            }
        } catch {
            console.error(`Error in checkRole() : ${error.message}`);
            log(error);
            throw error;
        }
    }

}

export default Role;