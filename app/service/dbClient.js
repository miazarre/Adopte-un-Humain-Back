import pg from 'pg';

const pool = new pg.Pool();

let queryCount = 0;

export default {
  // On expose quand même le client original "au cas ou"
  originalClient: pool,

  // On fait une méthode pour "intercepter"
  // les requêtes afin de pouvoir les afficher
  // L'opérateur de "rest" permet de transformer
  // ici X variables en param. en un tableau
  async query(...params) {
      // debug(...params);
      // queryCount += 1;
      // debug(`Req n°${queryCount}`);
      // // debug(`Req ${params[0].text}`);
      // // L'opérateur ici fait l'effet inverse on transforme
      // // un tableau en une liste
      // // de variables / paramétre ce qui fait que la méthode query du client sera
      // // appelé exactement de la même façon que celle de notre module
      return this.originalClient.query(...params);
    },
  };