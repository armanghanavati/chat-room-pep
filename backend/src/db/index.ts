import Messages from "../entities/messages/Messages";
import { DataSource } from "typeorm";

export const connection = async () => {
  const pool = new DataSource({
    type: "mssql",
    host: "coappweb",
    username: "sa",
    password: "P@yv@nd123",
    database: "ghana",
    entities: [Messages],
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

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const initializeDatabase = async () => {
//   try {
//     await prisma.$connect();
//     console.log("Connected to db . . . ");
//   } catch (error) {
//     console.error("Failed to connect to db:", error);
//     throw error;
//   }
// };

// initializeDatabase()
//   .then(() => {
//     console.log("Database connection established:");
//   })
//   .catch((error) => {
//     console.error("Error connecting to database:", error);
//   });
