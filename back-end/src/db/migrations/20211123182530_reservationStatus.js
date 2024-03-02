exports.up = function(knex) {
    return knex.schema.hasColumn('reservations', 'status').then(function(exists) {
      if (!exists) {
        return knex.schema.alterTable("reservations", (table) => {
          table.string("status").defaultTo("booked").notNullable().index();
        });
      }
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable("reservations", (table) => {
      table.dropColumn("status");
    });
  };

  