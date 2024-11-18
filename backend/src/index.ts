console.clear();
import express from "express";
import http from "http";
import cors from "cors";
import getAllRouter from "./routes";
import setupSocket from "./controller/socket-io/index";
import errorHandler from "./middleware/errorHandler";
import pageNotFound from "./middleware/pageNotFound";

const app = express();
const server = http.createServer(app);
const router = getAllRouter();
setupSocket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));
app.use("/api", router);

app.use(pageNotFound);
app.use(errorHandler);

const start = async () => {
  try {
    server.listen(4004, () => console.log("server is running:", 4004));
  } catch (error) {
    console.log(error);
  }
};

start();
