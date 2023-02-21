const Core = require('./core');
const client = require('../service/dbClient');

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
        // utilisateur de test :
        // INSERT INTO public."user"(
        //     fistname, lastname, username, email, password, birthdate)
        //     VALUES ('Chuck','Norris','cn','cn@gmail.com','maurice','1940-03-10'::date );

        const sqlQuery = "SELECT * FROM \"user\" WHERE username=$1 AND password=$2";
        const values = [this.username, this.password];

        const response = await client.query(sqlQuery, values);
        
        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
        if (response.rows.length == 1) {
            // je mets à jour le this (user qui appelle le checkPassword)
            this.firtname = response.rows[0].firstname;
            this.lastname = response.rows[0].lastname;

            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = User;