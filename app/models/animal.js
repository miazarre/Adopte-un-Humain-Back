const Core = require('./core');
const client = require('../service/dbClient');

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
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
        this.user_id = obj.user_id;
}

// START : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

static async getAnimalTags(animalId) {
  try {
    const { rows } = await client.query(`
      SELECT t.id, t.name, t.priority
      FROM animal_has_tag aht
      JOIN tag t ON aht.tag_id = t.id
      WHERE aht.animal_id = $1;
    `, [animalId]);

    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error getting animal tags - model');
  }
}

async addAnimalTag(animalId, tagId) {
    try {
      await client.query('INSERT INTO animal_has_tag (animal_id, tag_id) VALUES ($1, $2)', [animalId, tagId]);
  } catch (err) {
      console.error(err);
      throw new Error('Error adding animal tag');
  }
}

async deleteAnimalTag(animalId, tagId) {
    try {
      await client.query('DELETE FROM animal_has_tag WHERE animal_id = $1 AND tag_id = $2', [animalId, tagId]);
    } catch (err) {
      console.error(err);
      throw new Error('Error deleting animal tag');
    }
  }
// END : MON CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}

module.exports = Animal;