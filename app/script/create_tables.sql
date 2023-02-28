BEGIN;

-- Suppréssion des DOMAINS existants

DROP DOMAIN IF EXISTS "email_regex", "phone_number" CASCADE;

-- Création DOMAIN

CREATE DOMAIN email_regex AS text CHECK( 
    VALUE ~  '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

CREATE DOMAIN phone_number AS TEXT CHECK(VALUE ~ '^0[1-9]([-. ]?[0-9]{2}){4}$');

-- Suppression des tables existantes

DROP TABLE IF EXISTS "user", "role", "avatar", "adoption", "animal", "tag", "user_has_tag", "avatar_has_tag", "animal_has_tag" CASCADE;

-- Création des tables 

CREATE TABLE "role" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL UNIQUE,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT
);

CREATE TABLE "user" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname"     TEXT NOT NULL,
    "lastname"      TEXT NOT NULL,
    "email"         email_regex NOT NULL UNIQUE,
    "phone"         phone_number NOT NULL,
    "password"      TEXT NOT NULL,
    "address"       TEXT,
    "city"          TEXT,
    "postal_code"   TEXT,
    "country"       TEXT,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT,
    "role_id"       INTEGER REFERENCES "role"("id") DEFAULT 1
);

CREATE TABLE "avatar" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL UNIQUE,
    "picture"       TEXT,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT
);

CREATE TABLE "animal" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL,
    "resume"        TEXT,
    "description"   TEXT,
    "needs"         TEXT,
    "birthdate"     DATE,
    "status"        TEXT,
    "photo1"        TEXT,
    "photo2"        TEXT,
    "photo3"        TEXT,
    "photo4"        TEXT,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT
);

CREATE TABLE "adoption" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "comment"       TEXT,
    "form1"         TEXT NOT NULL,
    "form2"         TEXT NOT NULL,
    "form3"         TEXT NOT NULL,
    "status"        TEXT,
    "date_adopt"    DATE,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT,
    "user_id"       INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "animal_id"     INTEGER NOT NULL REFERENCES "animal"("id") ON DELETE CASCADE
);

-- Table "tag", proposition / explication => 
-- La colonne "name" contient le nom du filtre, la colonne "required" indique si le filtre est un critère obligatoire (TRUE) ou optionnel (FALSE), et la colonne "priority" permet aux utilisateurs de donner leur préférence pour chaque filtre.
-- En clair, pour "priority", TRUE ou FALSE = pour les hardfilters : 1 des 2 choix proposés pour les hardfilters / pour les filtres optionnels : selection ou pas).

CREATE TABLE "tag" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL UNIQUE,
    "priority"      BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT
);

CREATE TABLE "avatar_has_tag" (
    "avatar_id"     INTEGER REFERENCES "avatar"("id") ON DELETE CASCADE,
    "tag_id"        INTEGER REFERENCES "tag"("id") ON DELETE CASCADE,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT,
    PRIMARY KEY ("avatar_id", "tag_id")
);

CREATE TABLE "user_has_tag" (
    "user_id"       INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
    "tag_id"        INTEGER REFERENCES "tag"("id") ON DELETE CASCADE,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT,
    PRIMARY KEY ("user_id", "tag_id")
);

CREATE TABLE "animal_has_tag" (
    "animal_id"     INTEGER REFERENCES "animal"("id") ON DELETE CASCADE,
    "tag_id"        INTEGER REFERENCES "tag"("id") ON DELETE CASCADE,
    "created_at"    TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at"    TEXT,
    PRIMARY KEY ("animal_id", "tag_id")
);


COMMIT;