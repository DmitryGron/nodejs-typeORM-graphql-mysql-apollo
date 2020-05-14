import { ConnectionOptions } from "typeorm";
import commonConfig from "./src/config/common";
import config from "./src/config/database";

const connectionOptions: ConnectionOptions[] = [
  {
    name: "default",
    type: "mysql",
    database: config.mysql.default.db,
    synchronize: false,
    logging: commonConfig.env === "development",
    entities: [__dirname + "/src/entity/**/*.ts"],
    subscribers: [__dirname + "/src/subscribers/**/*.ts"],
    migrations: [__dirname + "/databases/migrations/**/*.ts"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/entities",
      subscribersDir: "src/subscribers",
      migrationsDir: "databases/migrations"
    },
    host: config.mysql.default.host,
    port: Number(config.mysql.default.port),
    username: config.mysql.default.user,
    password: config.mysql.default.password
  },
  {
    name: "test",
    type: "mysql",
    database: config.mysql.test.database,
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [__dirname + "/src/entity/**/*.ts"],
    host: config.mysql.test.host,
    port: Number(config.mysql.test.port),
    username: config.mysql.test.username,
    password: config.mysql.test.password
  }
];

export = connectionOptions;
