"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const Messages_1 = __importStar(require("../entities/messages/Messages"));
const typeorm_1 = require("typeorm");
const room_1 = __importDefault(require("../entities/room"));
const mentions_1 = __importDefault(require("../entities/mentions"));
const connection = async () => {
    const pool = new typeorm_1.DataSource({
        type: "mssql",
        host: "coappweb",
        username: "sa",
        password: "P@yv@nd123",
        database: "pepDB",
        entities: [Messages_1.default, room_1.default, mentions_1.default, Messages_1.Reciever],
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
    }
    catch (error) {
        console.error("Failed to connect to db:", error);
        throw error;
    }
};
exports.connection = connection;
(0, exports.connection)()
    .then((resolve) => {
    console.log("Database connection established:");
})
    .catch((error) => {
    console.error("Error connecting to database:", error);
});
exports.default = exports.connection;
//# sourceMappingURL=index.js.map