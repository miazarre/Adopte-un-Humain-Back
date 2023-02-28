BEGIN;

INSERT INTO role ("name") VALUES ('membre'), ('staff'), ('admin');
INSERT INTO tag ("name") VALUES ('Aventurier'), ('Calme'), ('Joueur'), ('Calin');

COMMIT;