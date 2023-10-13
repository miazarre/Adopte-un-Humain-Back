import client from "pg";
const { Pool } = client;
const pool = new Pool();

// Export de la méthode query qui utilise le client postgres. Crée une instance de Pool() qui est stockée dans la propriété originalClient
// Pool() va chercher les informations de connexion dans les variables d'environnement (.env)

export default {
  originalClient: pool,

  async query(...params) {
    return this.originalClient.query(...params);
  },
};
