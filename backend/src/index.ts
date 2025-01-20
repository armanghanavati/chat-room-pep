import express from "express";
import http from "http";
import cors from "cors";
import getAllRouter from "./routes";
import setupSocket from "./controller/socket-io/index";
import errorHandler from "./middleware/errorHandler";
import pageNotFound from "./middleware/pageNotFound";
import logger from "./log/logger";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
console.clear();

const app = express();
const server = http.createServer(app);
const router = getAllRouter();
setupSocket(server);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chat Room",
      version: "1.0.0",
      description: "API Description",
    },
  },
  apis: ["./src/routes/index.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));
app.use("/api", router);

app.use(pageNotFound);
app.use(errorHandler);

const start = async () => {
  try {
    server.listen(4005, () => console.log("server is running:", 4005));
  } catch (error) {
    logger.error("Error starting the server: " + error);
  }
};

start();
