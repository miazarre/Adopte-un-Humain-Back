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
    static async checkTag(req) {
        try {
            const sqlQuery = "SELECT * FROM \"tag\" WHERE name=$1";
            const values = [req.name];
            const response = await client.query(sqlQuery, values);
            if (response.rows.length == 1) {                        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
                return true;
            }
            else {
                return false;
            }
        } catch(error) {
            console.error(`Error in checkTag() : ${error.message}`)
            throw error;
        }
    }
    // Permet de vérifier si l'id existe
    static async checkTagId(id) {
        try {
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
        } catch(error) {
            console.error(`Error in checkTagId() : ${error.message}`)
            throw error;
        }
    }
}

export default Tag;