import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const client = new pg.Client();

await client.connect();

const execute = async (query) => {
  try {
    await client.query(query);
  } catch (err) {
    console.warn(err.message);
  }
};

const seed = async (table, query) => {
  try {
    const tableName = client.escapeIdentifier(table);
    const response = await client.query(`SELECT 1 FROM ${tableName} LIMIT 1`);

    if (response.rows.length > 0) {
      console.info(`${table} already seeded`);
    } else {
      console.info(`Seed ${table}`);
      await execute(query);
    }
  } catch (err) {
    console.warn(err.message);
  }
};

console.info("Create Database Structure");
console.group();

console.info('Domain "email_regex"');
await execute(
  "CREATE DOMAIN email_regex AS text CHECK(VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')"
);

console.info('Domain "phone_number"');
await execute(
  "CREATE DOMAIN phone_number AS TEXT CHECK(VALUE ~ '^0[1-9]([-. ]?[0-9]{2}){4}$')"
);

console.info('Table "role"');
await execute(
  `CREATE TABLE IF NOT EXISTS "role" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "name" TEXT NOT NULL UNIQUE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT)`
);

console.info('Table "user"');
await execute(
  `CREATE TABLE IF NOT EXISTS "user" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "firstname" TEXT NOT NULL, "lastname" TEXT NOT NULL, "email" email_regex NOT NULL UNIQUE, "phone" phone_number NOT NULL, "password" TEXT NOT NULL, "address" TEXT, "city" TEXT, "postal_code" TEXT, "country" TEXT, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT, "role_id" INTEGER REFERENCES "role"("id") DEFAULT 1 )`
);

console.info('Table "animal"');
await execute(
  `CREATE TABLE IF NOT EXISTS "animal" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "name" TEXT NOT NULL, "resume" TEXT, "description" TEXT, "needs" TEXT, "birthdate" DATE, "status" TEXT, "photo1" TEXT, "photo2" TEXT, "photo3" TEXT, "photo4" TEXT, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT)`
);

console.info('Table "adoption"');
await execute(
  `CREATE TABLE IF NOT EXISTS "adoption" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "comment" TEXT, "form1" TEXT NOT NULL, "form2" TEXT NOT NULL, "form3" TEXT NOT NULL, "status" TEXT, "date_adopt" DATE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT, "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, "animal_id" INTEGER NOT NULL REFERENCES "animal"("id") ON DELETE CASCADE)`
);

console.info('Table "tag"');
await execute(
  `CREATE TABLE IF NOT EXISTS "tag" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "name" TEXT NOT NULL UNIQUE, "priority" BOOLEAN NOT NULL DEFAULT FALSE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT )`
);

console.info('Table "user_has_tag"');
await execute(
  `CREATE TABLE IF NOT EXISTS "user_has_tag" ("user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE, "tag_id" INTEGER REFERENCES "tag"("id") ON DELETE CASCADE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT, PRIMARY KEY ("user_id", "tag_id") )`
);

console.info('Table "animal_has_tag"');
await execute(
  `CREATE TABLE IF NOT EXISTS "animal_has_tag" ("animal_id" INTEGER REFERENCES "animal"("id") ON DELETE CASCADE, "tag_id" INTEGER REFERENCES "tag"("id") ON DELETE CASCADE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT, PRIMARY KEY ("animal_id", "tag_id"))`
);

console.groupEnd();

console.info("Seed Database");
console.group();
await seed(
  "role",
  `INSERT INTO role ("name") VALUES ('membre'), ('staff'), ('admin')`
);
await seed(
  "tag",
  `INSERT INTO tag ("name") VALUES ('Aventurier'), ('Calme'), ('Joueur'), ('Calin')`
);
console.groupEnd();

await client.end();
