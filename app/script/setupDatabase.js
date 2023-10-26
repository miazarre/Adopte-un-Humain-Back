import dotenv from "dotenv";
import bcrypt from "bcrypt";
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

const create = async (table, query) => {
  console.info(`Creating ${table}...`);
  console.group();
  await execute(query);
  console.groupEnd();
};

const seed = async (table, query) => {
  console.info(`Seeding ${table}...`);
  console.group();
  try {
    const tableName = client.escapeIdentifier(table);
    const response = await client.query(`SELECT 1 FROM ${tableName} LIMIT 1`);

    if (response.rows.length > 0) {
      console.info(`${table} already seeded`);
    } else {
      await execute(query);
    }
  } catch (err) {
    console.warn(err.message);
  } finally {
    console.groupEnd();
  }
};

console.info("Create Database Structure");
console.group();
await create(
  "email_regex",
  "CREATE DOMAIN email_regex AS text CHECK(VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')"
);
await create(
  "phone_number",
  "CREATE DOMAIN phone_number AS TEXT CHECK(VALUE ~ '^0[1-9]([-. ]?[0-9]{2}){4}$')"
);
await create(
  "role",
  `CREATE TABLE IF NOT EXISTS "role" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "name" TEXT NOT NULL UNIQUE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT)`
);
await create(
  "user",
  `CREATE TABLE IF NOT EXISTS "user" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "firstname" TEXT NOT NULL, "lastname" TEXT NOT NULL, "email" email_regex NOT NULL UNIQUE, "phone" phone_number NOT NULL, "password" TEXT NOT NULL, "address" TEXT, "city" TEXT, "postal_code" TEXT, "country" TEXT, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT, "role_id" INTEGER REFERENCES "role"("id") DEFAULT 1 )`
);
await create(
  "animal",
  `CREATE TABLE IF NOT EXISTS "animal" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "name" TEXT NOT NULL, "resume" TEXT, "description" TEXT, "needs" TEXT, "birthdate" DATE, "status" TEXT, "photo1" TEXT, "photo2" TEXT, "photo3" TEXT, "photo4" TEXT, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT)`
);
await create(
  "adoption",
  `CREATE TABLE IF NOT EXISTS "adoption" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "comment" TEXT, "form1" TEXT NOT NULL, "form2" TEXT NOT NULL, "form3" TEXT NOT NULL, "status" TEXT, "date_adopt" DATE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT, "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, "animal_id" INTEGER NOT NULL REFERENCES "animal"("id") ON DELETE CASCADE)`
);
await create(
  "tag",
  `CREATE TABLE IF NOT EXISTS "tag" ("id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, "name" TEXT NOT NULL UNIQUE, "priority" BOOLEAN NOT NULL DEFAULT FALSE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT )`
);
await create(
  "user_has_tag",
  `CREATE TABLE IF NOT EXISTS "user_has_tag" ("user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE, "tag_id" INTEGER REFERENCES "tag"("id") ON DELETE CASCADE, "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'), "updated_at" TEXT, PRIMARY KEY ("user_id", "tag_id") )`
);
await create(
  "animal_has_tag",
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

const roleResponse = await client.query(
  "SELECT id FROM role WHERE name = 'admin' LIMIT 1"
);
if (roleResponse.rows.length > 0) {
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPassword = await bcrypt.hash(
    process.env.INITIAL_ADMIN_PASSWORD,
    10
  );
  const adminRoleID = roleResponse.rows[0].id;
  await seed(
    "user",
    `INSERT INTO "user" ("firstname", "lastname", "email", "phone", "password", "role_id") VALUES ('Initial', 'Admin', '${adminEmail}', '0601020304', '${adminPassword}', ${adminRoleID})`
  );
}
console.groupEnd();

await client.end();
