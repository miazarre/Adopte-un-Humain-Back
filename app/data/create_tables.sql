BEGIN;

-- Suppréssion des DOMAINS existants

DROP DOMAIN IF EXISTS "email_regex" CASCADE;

-- Création DOMAIN

CREATE DOMAIN email_regex AS text CHECK( 
    VALUE ~  '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

-- Suppression des tables existantes

DROP TABLE IF EXISTS "user", "role", "avatar", "adoption", "animal", "tag", "user_has_tag", "avatar_has_tag", "animal_has_tag" CASCADE;

-- Création des tables 

CREATE TABLE "role" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ
);

CREATE TABLE "user" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname"      TEXT NOT NULL,
    "lastname"      TEXT NOT NULL,
    "email"         email_regex NOT NULL UNIQUE,
    "phone"         INT NOT NULL,
    "password"      TEXT NOT NULL,
    "address"       TEXT,
    "city"          TEXT,
    "postal_code"   TEXT,
    "country"       TEXT,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ,
    "role_id"       INTEGER REFERENCES "role"("id") DEFAULT 1
);

CREATE TABLE "avatar" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL,
    "picture"       TEXT,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ
);

CREATE TABLE "animal" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL,
    "description"   TEXT,
    "needs"         TEXT,
    "birthdate"     DATE,
    "status"        TEXT,
    "photo1"        TEXT,
    "photo2"        TEXT,
    "photo3"        TEXT,
    "photo4"        TEXT,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ,
    "user_id"       INTEGER REFERENCES "user"("id")
);

CREATE TABLE "adoption" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "comment"       TEXT,
    "form1"         TEXT NOT NULL,
    "form2"         TEXT NOT NULL,
    "form3"         TEXT NOT NULL,
    "status"        TEXT,
    "date_adopt"    DATE,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ,
    "user_id"       INTEGER REFERENCES "user"("id"),
    "animal_id"     INTEGER REFERENCES "animal"("id")
);

-- Table "tag", proposition / explication => 
-- La colonne "name" contient le nom du filtre, la colonne "required" indique si le filtre est un critère obligatoire (TRUE) ou optionnel (FALSE), et la colonne "priority" permet aux utilisateurs de donner leur préférence pour chaque filtre.
-- En clair, pour "priority", TRUE ou FALSE = pour les hardfilters : 1 des 2 choix proposés pour les hardfilters / pour les filtres optionnels : selection ou pas).

CREATE TABLE "tag" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL,
    "required"      BOOLEAN NOT NULL DEFAULT FALSE,
    "priority"      BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"    TIMESTAMPTZ
);

CREATE TABLE "avatar_has_tag" (
    "avatar_id"     INTEGER REFERENCES "avatar"("id"),
    "tag_id"        INTEGER REFERENCES "tag"("id"),
    PRIMARY KEY ("avatar_id", "tag_id")
);

CREATE TABLE "user_has_tag" (
    "user_id"       INTEGER REFERENCES "user"("id"),
    "tag_id"        INTEGER REFERENCES "tag"("id"),
    PRIMARY KEY ("user_id", "tag_id")
);

CREATE TABLE "animal_has_tag" (
    "animal_id"     INTEGER REFERENCES "animal"("id"),
    "tag_id"        INTEGER REFERENCES "tag"("id"),
    PRIMARY KEY ("animal_id", "tag_id")
);


COMMIT;