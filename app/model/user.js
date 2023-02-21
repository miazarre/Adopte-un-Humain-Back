const { client }  = require("../service/dbClient");
const CoreDatamapper = require('./coreDatamapper');



const userModel =  {
  async findAllUsers() {
    const sqlQuery = `SELECT * FROM "user";`;
    try {
      const result = await client.query(sqlQuery);
      return result.rows;
            
    } catch(error) {
      console.log(error);
    }
    },
    
  async insert(user) {
    let result;
    const sqlQuery = `INSERT INTO "user" (firstname, lastname, email, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const passCrypt = await bcrypt.hash(user.password, 10)
    const values = [user.firstname, user.lastname, user.email, passCrypt, user.phone];
    console.log(user)
    try {
      const response = await client.query(sqlQuery,values);
      result = response.rows[0];
    } catch (error) {
      console.log(error);
    }
    return result;  
  }
   
};

class UserLog extends CoreDatamapper {
  static tableName = 'user';

  constructor(obj){
      super(obj);
      this.email = obj.email;
      this.password = obj.password;
  }

  async checkPassword() {
      // utilisateur de test :
      // INSERT INTO public."user"(
      //     fistname, lastname, username, email, password, birthdate)
      //     VALUES ('Chuck','Norris','cn','cn@gmail.com','maurice','1940-03-10'::date );

      const sqlQuery = "SELECT * FROM \"user\" WHERE username=$1 AND password=$2";
      const values = [this.email, this.password];

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

};

module.exports =  { client, userModel, UserLog } ;

