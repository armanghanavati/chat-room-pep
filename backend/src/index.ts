console.clear();
import express from "express";
import http from "http";
import cors from "cors";
import getAllRouter from "./routes";
import setupSocket from "./controller/socket-io/index";

const app = express();
const server = http.createServer(app);
const router = getAllRouter();
setupSocket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));
app.use("/api", router);

const start = async () => {
  try {
    server.listen(4004, () => console.log("server is running:", 4004));
  } catch (error) {
    console.log(error);
  }
};

start();