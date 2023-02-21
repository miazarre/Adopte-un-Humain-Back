const { client }  = require("../service/dbClient");


const coreDatamapper = {

    /**
     * Récupération par identifiant
     * @param {number|number[]} id identifiant ou liste d'identifiants
     * @returns un enregistrement ou une liste d'enregistrement
     */
    async findByPk(id, tableName) {
        const preparedQuery = {
            text: `SELECT * FROM "${tableName}" WHERE id = $1`,
            values: [id],
        };

        const result = await client.query(preparedQuery);

        if (!result.rows[0]) {
            return null;
        }

        return result.rows[0];
    },

    async findAll(params, tableName) {
        let filter = '';
        const values = [];

        if (params?.$where) {
            const filters = [];
            let indexPlaceholder = 1;

            Object.entries(params.$where).forEach(([param, value]) => {
                if (param === '$or') {
                    const filtersOr = [];
                    Object.entries(value).forEach(([key, val]) => {
                        filtersOr.push(`"${key}" = $${indexPlaceholder}`);
                        values.push(val);
                        indexPlaceholder += 1;
                    });
                    filters.push(`(${filtersOr.join(' OR ')})`);
                } else {
                    filters.push(`"${param}" = $${indexPlaceholder}`);
                    values.push(value);
                    indexPlaceholder += 1;
                }
            });
            filter = `WHERE ${filters.join(' AND ')}`;
        }

        const preparedQuery = {
            text: `
                SELECT * FROM "${tableName}"
                ${filter}
            `,
            values,
        };

        const result = await client.query(preparedQuery);
        console.log(result.rows);
        return result.rows;
    },

    async create(inputData, tableName) {
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
                INSERT INTO "${tableName}"
                (${fields})
                VALUES (${placeholders})
                RETURNING *
            `,
            values,
        };

        const result = await client.query(preparedQuery);
        const row = result.rows[0];

        return row;
    },

    async update(id , inputData, tableName) {
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
                UPDATE "${tableName}" SET
                ${fieldsAndPlaceholders},
                updated_at = now()
                WHERE id = $${indexPlaceholder}
                RETURNING *
            `,
            values,
        };

        const result = await client.query(preparedQuery);
        const row = result.rows[0];

        return row;
    },

    async delete(id, tableName) {
        const result = await client.query(`DELETE FROM "${tableName}" WHERE id = $1 RETURNING *;`, [id]);
        return result.rows;
        // return !!result.rowCount;
    }
}



module.exports = coreDatamapper;