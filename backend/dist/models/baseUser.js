"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BaseUser = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    name: {
        type: String
    },
    last_name: {
        type: String
    },
    phone: {
        type: Number
    },
    id: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('BaseUser', BaseUser, 'baseUsers');
//# sourceMappingURL=baseUser.js.map