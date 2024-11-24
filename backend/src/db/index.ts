import Messages, { Reciever } from "../entities/messages/Messages";
import { DataSource } from "typeorm";
import Group from "../entities/room";
import Mentions from "../entities/mentions";
import { LoginInfo } from "../entities/login";

export const connection = async () => {
  const pool = new DataSource({
    type: "mssql",
    host: "coappweb",
    username: "sa",
    password: "P@yv@nd123",
    database: "pepDB",
    entities: [Messages, Group, Mentions, Reciever, LoginInfo],
    // entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  });

  try {
    await pool.initialize();
    console.log("Connected to db . . . ");
    return pool;
  } catch (error) {
    console.error("Failed to connect to db:", error);
    throw error;
  }
};

connection()
  .then((resolve) => {
    console.log("Database connection established:");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

export default connection;
