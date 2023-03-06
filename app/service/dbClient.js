import client from 'pg';
const { Pool } = client;

const pool = new Pool();

let queryCount = 0;

export default {
  originalClient: pool,

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
