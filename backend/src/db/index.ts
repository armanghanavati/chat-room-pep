import { Sequelize } from "sequelize-typescript";
import { Message } from "../models/messages";
import { Group } from "../models/group";

export const connection = async () => {
  const sequelize = new Sequelize({
    database: "pepDB",
    dialect: "mssql",
    host: "coappweb",
    username: "sa",
    password: "P@yv@nd123",
    models: [Message, Group],
    logging: false,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
  });

  try {
    await sequelize.authenticate();
    console.log("Connected to db . . . ");
    await sequelize.sync();
    return sequelize;
  } catch (error) {
    console.error("Failed to connect to db:", error);
    throw error;
  }
};

connection()
  .then(() => {
    console.log("Database connection established and models synced:");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

export default connection;
