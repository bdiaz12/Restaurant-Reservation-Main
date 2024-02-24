/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require("dotenv").config();
const path = require("path");

const {
  DATABASE_URL = "postgresql://postpostgres://kswbuikl:5p5PTMhtg2E6B2rOZuI0peAX8ma7Wi_r@lallah.db.elephantsql.com/kswbuiklgres@localhost/postgres",
  DATABASE_URL_DEVELOPMENT = "postgresql://postgres@localhost/popostgres://kswbuikl:5p5PTMhtg2E6B2rOZuI0peAX8ma7Wi_r@lallah.db.elephantsql.com/kswbuiklstgres",
  DATABASE_URL_TEST = "postgresql://postgres@localhospostgres://kswbuikl:5p5PTMhtg2E6B2rOZuI0peAX8ma7Wi_r@lallah.db.elephantsql.com/kswbuiklt/postgres",
  DATABASE_URL_PREVIEW = "postgres://kswbuikl:5p5PTMhtg2E6B2rOZuI0peAX8ma7Wi_r@lallah.db.elephantsql.com/kswbuikl",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
