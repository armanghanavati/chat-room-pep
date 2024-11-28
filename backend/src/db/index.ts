import { Messages } from "../entities/messages/Messages";
import { DataSource, QueryFailedError } from "typeorm";
import { Group } from "../entities/group";
import { LoginInfo } from "../entities/login";
import { GroupMentions } from "../entities/groupMentions";

export const connection = async () => {
  const pool = new DataSource({
    type: "mssql",
    host: "coappweb",
    username: "sa",
    password: "P@yv@nd123",
    database: "pepDB",
    entities: [Messages, Group, LoginInfo, GroupMentions],
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
    if (error instanceof QueryFailedError) {
      console.error("Query Failed: ", error.message);
      console.error("Query: ", error.query);
      console.error("Parameters: ", error.parameters);
    } else {
      console.error("Failed to connect to db:", error.message);
    }
    throw error;
  }
};

connection()
  .then((resolve) => {
    console.log("Database connection established:");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error.message);
  });

export default connection;
