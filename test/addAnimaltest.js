require('@babel/register')({
    presets: ['@babel/preset-env']
  });
  
  import request from "supertest";
  import animalsController from '../app/controllers/animals.js';
  import Animal from '../app/models/animal.js';
  
  describe("Test de la méthode addAnimal du controller", () => {
    it("devrait ajouter un nouvel animal", async () => {
      const res = await request(animalsController)
        .post("/api/v1/animals")
        .field("name", "Nouvel animal")
        .field("description", "Description de l'animal")
        .field("needs", "Besoins de l'animal")
        .field("status", "Disponible")
        .field("resume", "Résumé de l'animal")
        .field("birthdate", "2022-03-08")
        .attach("photo1", "tests/files/test_photo.png");
  
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual("Nouvel animal");
      expect(res.body.description).toEqual("Description de l'animal");
      expect(res.body.needs).toEqual("Besoins de l'animal");
      expect(res.body.status).toEqual("Disponible");
      expect(res.body.resume).toEqual("Résumé de l'animal");
      expect(res.body.birthdate).toEqual("2022-03-08");
      expect(res.body.photo1).toBeDefined();
    });
  });