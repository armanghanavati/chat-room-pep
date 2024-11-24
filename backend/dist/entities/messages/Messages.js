"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reciever = void 0;
const typeorm_1 = require("typeorm");
let Messages = class Messages extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], Messages.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Messages.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Messages.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Messages.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Object)
], Messages.prototype, "recieverId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Messages.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Reciever, (reciever) => reciever.message, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Messages.prototype, "recievers", void 0);
Messages = __decorate([
    (0, typeorm_1.Entity)("chat-message")
], Messages);
exports.default = Messages;
let Reciever = class Reciever extends typeorm_1.BaseEntity {
};
exports.Reciever = Reciever;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reciever.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Number)
], Reciever.prototype, "recieverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Messages, (message) => message.recievers),
    __metadata("design:type", Messages)
], Reciever.prototype, "message", void 0);
exports.Reciever = Reciever = __decorate([
    (0, typeorm_1.Entity)("receivers")
], Reciever);
//# sourceMappingURL=Messages.js.map