const { options } = require("../config/sqlite.js");
const knex = require("knex")(options);

knex.schema
  .createTable("mensajes", (table) => {
    table.increments("id"), table.string("socketid"), table.string("timestamp"), table.string("mensaje"), table.string("email");
  })
  .then(() => {
    console.log("La tabla se creo correctamente");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });
