const Core = require('./core');
const client = require('../service/dbClient');
const bcrypt = require('bcrypt');

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
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
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

    // START : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

static async getUserTags(userId) {
    try {
      const preparedQuery = {
        text:`
        SELECT t.id AS "user_has_tag id", 'user.name' AS "user_name", 'user.id' AS "user_id", t.name AS "tag name", t.id AS "tag_id"
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
  // END : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}

module.exports = User;