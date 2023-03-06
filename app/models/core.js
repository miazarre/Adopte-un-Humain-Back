import client from '../service/dbClient.js';

class Core {
    tableName;

    constructor() {
    }

    /**
     * Récupération par identifiant
     * @param {number|number[]} id identifiant ou liste d'identifiants
     * @returns un enregistrement ou une liste d'enregistrement
     */
    static async findByPk(id) {
        try {
            const preparedQuery = {
                text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
                values: [id],
            };

            const result = await client.query(preparedQuery);

            if (!result.rows[0]) {
                return null;
            }

            return result.rows[0];
        } catch (error) {
            console.error(`Error in findByPk() : ${error.message}`)
            throw error;
        }
    }

    static async findAll(params) {
        try {
            let filter = '';
            const values = [];

            // params? je vérifie si params existe, puis je vérifie si params.$where existe
            if (params?.$where) {
                const filters = []; // j'initialise mon tableau qui va contenir mes conditions du WHERE
                let indexPlaceholder = 1; // j'initialise un compteur pour gérer mes $1,$2...

                // Object.entries vient décomposer mon objet en un tableau qui va contenir des tableaux à deux dimensions [ clef , valeur ]
                Object.entries(params.$where).forEach(([param, value]) => {
                    // on est le paramètre actuel pour voir s'il correspond à $or (ceci nous permet de gérer des cas où on souhaite avoir un OR dans notre WHERE)
                    if (param === '$or') {
                        const filtersOr = [];
                        // On vient décomposer notre value dans le cas où ce serait un objet (pour créer une requête encore plus complexe)
                        Object.entries(value).forEach(([key, val]) => { // par exemple ["city_id",2]
                            filtersOr.push(`"${key}" = $${indexPlaceholder}`); // on vient ajouter $1 à la première itération, puis ça sera $2 puis $3...
                            values.push(val); // on ajoute la valeur (dans l'exemple 2)
                            indexPlaceholder += 1; // on incrémente notre compteur pour correspondre au $1, $2...
                        });
                        filters.push(`(${filtersOr.join(' OR ')})`); // on vient ajouter d'éventuel OR à notre requête si mon paramètre au départ (dans le if) était $or
                    } else {
                        filters.push(`"${param}" = $${indexPlaceholder}`); // city_id = $1
                        values.push(value); // on ajoute la valeur
                        indexPlaceholder += 1; // on incrémente notre compteur pour gérer les $1, $2...
                    }
                });
                filter = `WHERE ${filters.join(' AND ')}`;
            }

            const preparedQuery = {
                text: `
                    SELECT * FROM "${this.tableName}"
                    ${filter}
                    
                `, 
                values,
            };

            const result = await client.query(preparedQuery);
            // console.log(result.rows);

            return result.rows;
        } catch (error) {
            console.error(`Error in findAll() : ${error.message}`)
            throw error;
        }
        
    }

    static async create(inputData) {
        try {
            const fields = [];
            const placeholders = [];
            const values = [];
            let indexPlaceholder = 1;

            Object.entries(inputData).forEach(([prop, value]) => {
                fields.push(`"${prop}"`);
                placeholders.push(`$${indexPlaceholder}`);
                indexPlaceholder += 1;
                values.push(value);
            });
            const preparedQuery = {
                text: `
                    INSERT INTO "${this.tableName}"
                    (${fields})
                    VALUES (${placeholders})
                    RETURNING *
                `,
                values,
            };

            const result = await client.query(preparedQuery);
            const row = result.rows[0];

            return row;
        } catch (error) {
            console.error(`Error in create() : ${error.message}`)
            throw error;
        }
    }

    static async update( id , inputData) {
        try {
            const fieldsAndPlaceholders = [];
            let indexPlaceholder = 1;
            const values = [];

            Object.entries(inputData).forEach(([prop, value]) => {
                fieldsAndPlaceholders.push(`"${prop}" = $${indexPlaceholder}`);
                indexPlaceholder += 1;
                values.push(value);
            });

            values.push(id);

            const preparedQuery = {
                text: `
                    UPDATE "${this.tableName}" SET
                    ${fieldsAndPlaceholders},
                    updated_at = TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS')
                    WHERE id = $${indexPlaceholder}
                    RETURNING *
                `,
                values,
            };

            const result = await client.query(preparedQuery);
            const row = result.rows[0];

            return row;
        }catch (error) {
            console.error(`Error in update() : ${error.message}`)
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await client.query(`DELETE FROM "${this.tableName}" WHERE id = $1 RETURNING *`, [id]);
            return result.rows;
        } catch (error) {
            console.error(`Error in delete() : ${error.message}`)
            throw error;
        }
    }

    static async checkExist(id) {
        const sqlQuery = `SELECT * FROM "${this.tableName}" WHERE id=$1`;
        const values = [id];
        const response = await client.query(sqlQuery, values);
        // si l'id existe je retourne true
        if (response.rows.length == 1) {
            return true;
        }
        else {
            return false;
        }
    }
}

export default Core;