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

}

module.exports = User;