import Core from './core.js';
import client from '../service/dbClient.js';
import bcrypt from 'bcrypt';

class User extends Core {
    static tableName = 'user';

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.email = obj.email;
        this.phone = obj.phone;
        this.password = obj.password;
        this.address = obj.address;
        this.city = obj.city;
        this.postal_code = obj.postal_code;
        this.country = obj.country;
        this.role_id = obj.role_id;
    }


    /**
     * Méthode d'instance permettant de vérifier en base de donnée la validatité du couple username/password
     * @returns boolean
     */
    async checkPassword() {

        const sqlQuery = "SELECT * FROM \"user\" WHERE email=$1 AND password=$2";
        const values = [this.email, this.password];

        const response = await client.query(sqlQuery, values);
        
        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
        if (response.rows.length == 1) {
            // je mets à jour le this (user qui appelle le checkPassword)
            this.firstname = response.rows[0].firstname;
            this.lastname = response.rows[0].lastname;

            return true;
        }
        else {
            return false;
        }
    }

    // Permet de vérifier si le mail est déjà utilisé
    async checkEmail() {
        const sqlQuery = "SELECT * FROM \"user\" WHERE email=$1";
        const values = [this.email];
        const response = await client.query(sqlQuery, values);
        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
        if (response.rows.length == 1) {
            return true;
        }
        else {
            return false;
        }
    }

    // Permet de vérifier si le mail est déjà utilisé
    async checkEmailLogin() {
        const sqlQuery = "SELECT * FROM \"user\" WHERE email=$1";
        const values = [this.email];
        const response = await client.query(sqlQuery, values);
        
        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
        if (response.rows.length == 1) {
            if(await bcrypt.compare(this.password, response.rows[0].password)) {
                return true;
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    // Permet de vérifier si l'adresse mail est conforme
    async regexEmail() {
        const email = /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.email);
        if(email) {
            return true;
        }
        else {
            return false;
        }
    }

    // Permet de vérifier si l'adresse mail est conforme
    async regexPhone() {
        const phone = /^0[1-9]([-. ]?[0-9]{2}){4}$/.test(this.phone);
        if(phone) {
            return true;
        }
        else {
            return false;
        }
    }


static async getUserTags(userId) {
    try {
      const preparedQuery = {
        text:`
        SELECT  t.name AS "tag_name", t.id AS "tag_id", t.priority
        FROM user_has_tag uht
        JOIN tag t ON uht.tag_id = t.id
        JOIN "user" ON uht.user_id = "user".id
        WHERE uht.user_id = $1;`,
        values: [userId] 
      };
  
      const result = await client.query(preparedQuery);
        if (!result.rows) {
          return null;
        }
  
       return result.rows;
  
    } catch (err) {
      console.error(err);
      throw new Error('Error getting user tags - model');
    }
  }
  
  static async addUserTag(userId, tagId) {
      try {
        const preparedQuery = {
        text:'INSERT INTO user_has_tag (user_id, tag_id) VALUES ($1, $2) RETURNING *',
        values: [userId, tagId]
        };
        const result = await client.query(preparedQuery);
        const row = result.rows[0];
  
        return row;
  
    } catch (err) {
        console.error(err);
        throw new Error('Error adding user tag');
    }
  }
  
  static async deleteUserTag(userId, tagId) {
      try {
        const preparedQuery =  {
        text:'DELETE FROM user_has_tag WHERE user_id = $1 AND tag_id = $2 RETURNING *',
        values: [userId, tagId]
        };
        const result = await client.query(preparedQuery);
        const row = result.rows[0];
  
        return row;
      } catch (err) {
        console.error(err);
        throw new Error('Error deleting user tag');
      }
    }
  
      // Permet de vérifier si ca existe
    static  async checkUser(id) {
        const sqlQuery = "SELECT * FROM \"user\" WHERE id=$1";
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

    static async matchingAll(id) {
        try {
            const preparedQuery = {
                text:`
                SELECT animal.id AS "animal_id", animal.name AS "animal_name", tag.id AS tag_id, tag.name AS tag_name, tag.priority
                FROM animal
                JOIN animal_has_tag ON animal.id = animal_has_tag.animal_id
                JOIN tag ON animal_has_tag.tag_id = tag.id
				WHERE tag.id IN (
                SELECT tag_id
                FROM user_has_tag
                WHERE user_id = $1
                );`,
                values: [id] 
            };
            const result = await client.query(preparedQuery);
            if (!result.rows) {
                return null;
            }        
            return result.rows;
        
        } catch(error) {

        }
    }

    static async matchingOne(userId, animalId) {
        try {
            const preparedQuery = {
                text:`
                SELECT
                COALESCE(user_tags.id, animal_tags.id) AS tag_id,
                COALESCE(user_tags.name, animal_tags.name) AS tag_name,
                COALESCE(user_tags.priority, animal_tags.priority) AS priority,
                COUNT(CASE WHEN user_tags.id IS NOT NULL AND animal_tags.id IS NOT NULL THEN 1 END) AS match_count,
                CASE WHEN user_tags.id IS NOT NULL AND animal_tags.id IS NULL THEN CONCAT(user_tags.name, ' - utilisateur')
                    WHEN user_tags.id IS NULL AND animal_tags.id IS NOT NULL THEN CONCAT(animal_tags.name, ' - animal')
                    WHEN user_tags.id IS NOT NULL THEN CONCAT(user_tags.name, ' - commun')
                END AS statut
                FROM (
                SELECT tag.id, tag.name, tag.priority
                FROM "user"
                JOIN user_has_tag ON "user".id = user_has_tag.user_id
                JOIN tag ON user_has_tag.tag_id = tag.id
                WHERE "user".id = $1
                ) AS user_tags
                FULL OUTER JOIN (
                SELECT tag.id, tag.name, tag.priority
                FROM animal
                JOIN animal_has_tag ON animal.id = animal_has_tag.animal_id
                JOIN tag ON animal_has_tag.tag_id = tag.id
                WHERE animal.id = $2
                ) AS animal_tags ON user_tags.id = animal_tags.id
                GROUP BY COALESCE(user_tags.id, animal_tags.id), 
                COALESCE(user_tags.name, animal_tags.name), 
                COALESCE(user_tags.priority, animal_tags.priority), statut;`,
                values: [userId,animalId] 
            };
            const result = await client.query(preparedQuery);
            if (!result.rows) {
                return null;
            }        
            return result.rows;
        
        } catch(error) {

        }
    }


}

export default User;