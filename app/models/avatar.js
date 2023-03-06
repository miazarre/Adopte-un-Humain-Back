import Core from './core.js';
import client from '../service/dbClient.js';

class Avatar extends Core {
    static tableName = 'avatar';

  constructor(obj) {
    super(obj);
    this.id = obj.id;
    this.name = obj.name;
    this.picture = obj.picture;
  }

static async getAvatarTags(avatarId) {
  try {
    const preparedQuery = {
      text:`
      SELECT avatar.id AS "avatar_id", t.name AS "tag_name", t.priority
      FROM avatar_has_tag aht
      JOIN tag t ON aht.tag_id = t.id
	    JOIN avatar ON aht.avatar_id = avatar.id
      WHERE aht.avatar_id = $1;`,
      values: [avatarId] 
    };

    const result = await client.query(preparedQuery);
      if (!result.rows) {
        return null;
      }

     return result.rows;

  } catch (err) {
    console.error(err);
    throw new Error('Error getting avatar tags - model');
  }
}

static async addAvatarTag(avatarId, tagId) {
    try {
      const preparedQuery = {
      text:'INSERT INTO avatar_has_tag (avatar_id, tag_id) VALUES ($1, $2) RETURNING *',
      values: [avatarId, tagId]
      };
      const result = await client.query(preparedQuery);
      const row = result.rows[0];

      return row;

  } catch (err) {
      console.error(err);
      throw new Error('Error adding avatar tag');
  }
}

static async deleteAvatarTag(avatarId, tagId) {
    try {
      const preparedQuery =  {
      text:'DELETE FROM avatar_has_tag WHERE avatar_id = $1 AND tag_id = $2 RETURNING *',
      values: [avatarId, tagId]
      };
      const result = await client.query(preparedQuery);
      const row = result.rows[0];

      return row;
    } catch (err) {
      console.error(err);
      throw new Error('Error deleting avatar tag');
    }
  }

    // Permet de vérifier si ca existe
  static  async checkAvatar(id) {
      const sqlQuery = "SELECT * FROM \"avatar\" WHERE id=$1";
      const values = [id];
      const response = await client.query(sqlQuery, values);
      // si j'ai une réponse c'est que l'avatar a été trouvé en BDD
      if (response.rows.length == 1) {
          return true;
      }
      else {
          return false;
      }
  }
}

export default Avatar;