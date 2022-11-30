const knex = require("../config/knex.js");

class Contenedor {
  constructor(table) {
    this.table = table;
  }

  getAll = async () => {
    try {
      const archivo = await knex(this.table).select("*");
      return archivo;
    } catch (error) {
      console.log(error);
    }
  };

  save = async (producto) => {
    try {
      await knex(this.table).insert(producto);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = Contenedor;
