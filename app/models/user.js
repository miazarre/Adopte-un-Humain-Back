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

    // Recherche un utilisateur par son id, join la table role afin de récupérer le nom du role lié à son role_id
    static async userFindByPk(id) {
        try {
            const preparedQuery = {
                text:`
                SELECT "user".*, role.name AS name_role
                FROM "user"
                JOIN role ON role.id = "user".role_id
                WHERE "user".id = $1
                ;`,
                values: [id] 
            };
            const result = await client.query(preparedQuery);
            if (!result.rows) {
                return null;
            }       
            return result.rows;
        } catch(error) {
            console.error(`Error in userFindByPk() : ${error}`)
            const message = `Error in userFindByPk() : ${error.message}`
            throw new Error(message);
        }

    }

    /**
     * Méthode d'instance permettant de vérifier en base de donnée la validatité du couple username/password
     * @returns boolean
     */
    async checkPassword() {
        try {
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
        } catch(error) {
            console.error(`Erreur checkPassword() : ${error.message}`)
            throw error;            
        }
    }

    /**
     * Méthode d'instance permettant de vérifier en base de donnée si l'adresse email existe
     * @returns boolean
     */
    async checkEmail(req) {
        try {
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
        } catch(error) {
            console.error(`Erreur checkEmail() : ${error.message}`)
            throw error;
    }
    }

    /**
     * Méthode d'instance permettant de vérifier en base de donnée si l'email existe et si le password est celui de l'utilisateur
     * @returns boolean
     */
    async checkEmailLogin() {
        try {
            const sqlQuery = "SELECT * FROM \"user\" WHERE email=$1";
            const values = [this.email];
            const response = await client.query(sqlQuery, values);
            if (response.rows.length == 1) {                                            // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
                if(await bcrypt.compare(this.password, response.rows[0].password)) {
                    return true;
                } else {
                    return false;
                }
            }
            else {
                return false;
            }
        } catch(error) {
                console.error(`Error in checkEmailLogin() : ${error.message}`)
                throw error;
    }
    }

    /**
     * Méthode permettant de vérifier si l'adresse email est conforme
     * @returns boolean
     */
    async regexEmail() {
        try {
            const email = /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.email);
            if(email) {
                return true;
            }
            else {
                return false;
            }
        } catch(error) {
            console.error(`Error in regexEmail() : ${error.message}`)
            throw error;
        }
    }

    /**
     * Méthode permettant de vérifier si le numéro de téléphone est conforme
     * @returns boolean
     */
    async regexPhone() {
        try {
            const phone = /^0[1-9]([-. ]?[0-9]{2}){4}$/.test(this.phone);
            if(phone) {
                return true;
            }
            else {
                return false;
            }
        } catch(error) {
            console.error(`Error in regexPhone() : ${error.message}`)
            throw error;
        }
    }

// Récupère tous les tags lié à l'utilisateur 
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
  
    } catch (error) {
        console.error(`Error in getUserTags() : ${error.message}`)
        throw error;
    }
  }
  
  // Ajoute un tag à l'utilisateur
  static async addUserTag(userId, tagId) {
    try {
        const preparedQuery = {
        text:'INSERT INTO user_has_tag (user_id, tag_id) VALUES ($1, $2) RETURNING *',
        values: [userId, tagId]
        };
        const result = await client.query(preparedQuery);
        const row = result.rows[0];
  
        return row;
  
    } catch (error) {
        console.error(`Error in addUserTag() : ${error.message}`)
        throw error;
    }
  }
  
  // Supprime un tag à l'utilisateur
  static async deleteUserTag(userId, tagId) {
    try {
        const preparedQuery =  {
        text:'DELETE FROM user_has_tag WHERE user_id = $1 AND tag_id = $2 RETURNING *',
        values: [userId, tagId]
        };
        const result = await client.query(preparedQuery);
        const row = result.rows[0];
  
        return row;
    } catch (error) {
        console.error(`Error in deleteUserTag() : ${error.message}`)
        throw error;
    }
}
  
      // Permet de vérifier si l'utilisateur existe
    static  async checkUser(id) {
        try {
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
        }catch(error) {
            console.error(`Error in checkUser() : ${error.message}`)
            throw error;
        }
    }

    // Requête qui permet d'afficher tous les animaux et les tags qui sont en commun avec l'utilisateur
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
            console.error(`Error in matchingAll() : ${error.message}`)
            throw error;

        }
    }

    // Affiche tous les tags en entre un utilisateur et un animal, Affiche les tags en commun entre les 2, 
    // affiche également les tags de l'utilisateur et de l'animal qui ne sont pas en commun.

    // COALESCE renvoie la première valeur non nulle  de user_tags.id, animal_tags.id; user_tags.name, animal_tags.name et user_tags.priority, animal_tags.priority
    // Si la valeur entre les 2 sont nulles alors elle renvoie "null"
    // COALESCE(user_tags.id, animal_tags.id) AS tag_id,         Récupère l'id que l'utilisateur et l'animal ont en commun par le tag_id
    // COALESCE(user_tags.name, animal_tags.name) AS tag_name    Récupère le nom du tag que l'utilisateur et l'animal ont en commun
    // COUNT(CASE WHEN user_tags.id IS NOT NULL AND animal_tags.id IS NOT NULL THEN 1 END) AS match_count, Si le tag est en commun ajoute un compte 1 au match_count (alias match_count)
    // CASE WHEN compte le nombre ou les tags entre l'utilisateur et l'animal tous les 2 non nuls, si c'est le cas ajoute la valeur 1.
    // Si CASE WHEN user_tags.id est non null et animal_tags.id est null renvoie le nom du tag lié à l'utilisateur concaténé à - utilisateur
    // Si CASE WHEN user_tags.id est null et animal_tags.id est non null renvoie le nom du tag lié à l'animal concaténé à - animal
    // Si CASE WHEN user_tags.id sont non null renvoie le nom du tag lié à l'utilisateur concaténé à - utilisateur
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
            console.error(`Error in matchingOne() : ${error.message}`)
            throw error;
        }
    }
}

export default User;