"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Business = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: Number
    },
    odgLice: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    title: {
        type: String
    },
    address: {
        type: String
    },
    pib: {
        type: Number
    },
    matBr: {
        type: Number
    },
    restaurant: {
        type: Number
    },
    activities: {
        type: Array
    },
    pdv: {
        type: Boolean
    },
    accNum: {
        type: Number
    },
    category: {
        type: String
    },
    logo: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Business', Business, 'businesses');
//# sourceMappingURL=business.js.map