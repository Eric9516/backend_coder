const { mysql } = require("../config/knex.js");
const knex = require("knex")(mysql);

knex.schema
  .createTable("productos", (table) => {
    table.increments("id"), table.string("nombre"), table.string("precio"), table.string("image");
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
