import Core from './core.js';
import client from '../service/dbClient.js';

class Animal extends Core {
static tableName = 'animal';

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.name = obj.name;
        this.resume = obj.resume;
        this.description = obj.description;
        this.needs = obj.needs;
        this.birthdate = obj.birthdate;
        this.status = obj.status;
        this.photo1 = obj.photo1;
        this.photo2 = obj.photo2;
        this.photo3 = obj.photo3;
        this.photo4 = obj.photo4;
}

static async getAnimalTags(animalId) {
  try {
    const preparedQuery = {
      text:`
      SELECT t.name AS "tag_name", t.id AS "tag_id", t.priority
      FROM animal_has_tag aht
      JOIN tag t ON aht.tag_id = t.id
	    JOIN animal ON aht.animal_id = animal.id
      WHERE aht.animal_id = $1;`,
      values: [animalId] 
    };

    const result = await client.query(preparedQuery);
      if (!result.rows) {
        return null;
      }

     return result.rows;

  } catch (error) {
    console.error(`Error in getAnimalTags() : ${error.message}`)
    throw error;
  }
}

static async addAnimalTag(animalId, tagId) {
    try {
      const preparedQuery = {
      text:'INSERT INTO animal_has_tag (animal_id, tag_id) VALUES ($1, $2) RETURNING *',
      values: [animalId, tagId]
      };
      const result = await client.query(preparedQuery);
      const row = result.rows[0];

      return row;

  } catch (error) {
      console.error(`Error in addAnimalTag() : ${error.message}`)
      throw error;
  }
}

static async deleteAnimalTag(animalId, tagId) {
    try {
      const preparedQuery =  {
      text:'DELETE FROM animal_has_tag WHERE animal_id = $1 AND tag_id = $2 RETURNING *',
      values: [animalId, tagId]
      };
      const result = await client.query(preparedQuery);
      const row = result.rows[0];

      return row;
    } catch (error) {
      console.error(`Error in deleteAnimalTag() : ${error.message}`)
        throw error;
    }
  }

    // Permet de vérifier si ca existe
  static  async checkAnimal(id) {
    try {
      const sqlQuery = "SELECT * FROM \"animal\" WHERE id=$1";
      const values = [id];
      const response = await client.query(sqlQuery, values);
      // si j'ai une réponse c'est que l'animal a été trouvé en BDD
      if (response.rows.length == 1) {
          return true;
      }
      else {
          return false;
      }
    } catch(error) {
        console.error(`Error in checkAnimal() : ${error.message}`)
        throw error;
    }
  }
}

export default Animal;