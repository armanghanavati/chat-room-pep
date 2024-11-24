"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorApi = void 0;
class CustomErrorApi extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomErrorApi = CustomErrorApi;
//# sourceMappingURL=index.js.map