const { options } = require("../config/sqlite.js");
const knex = require("knex")(options);

class ContenedorMsg {
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

module.exports = ContenedorMsg;
