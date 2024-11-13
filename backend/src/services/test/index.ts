import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

// generator client {
//     provider = "prisma-client-js"
//   }

//   datasource db {
//     provider = "sqlserver"
//     url      = env("DATABASE_URL")
//   }

//   model Group {
//     id   Int    @id @default(autoincrement())
//     name String
//   }

//   model Message {
//     id        Int      @id @default(autoincrement())
//     userId    String
//     userName  String
//     content   String
//     timestamp DateTime @default(now())
//     roomId    String
//   }
