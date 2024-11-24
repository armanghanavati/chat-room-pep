"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const index_1 = __importDefault(require("./controller/socket-io/index"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const pageNotFound_1 = __importDefault(require("./middleware/pageNotFound"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const router = (0, routes_1.default)();
(0, index_1.default)(server);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: false }));
app.use("/api", router);
app.use(pageNotFound_1.default);
app.use(errorHandler_1.default);
const start = async () => {
    try {
        server.listen(4004, () => console.log("server is running:", 4004));
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=index.js.map