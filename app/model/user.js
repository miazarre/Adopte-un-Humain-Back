const { client }  = require("../service/dbClient");
const bcrypt = require('bcrypt');




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
}


module.exports =  { client, userModel } ;

