const { client }  = require("../service/dbClient");



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
   
}


module.exports =  { client, userModel } ;

