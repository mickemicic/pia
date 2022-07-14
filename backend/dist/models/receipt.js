"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Receipt = new Schema({
    title: {
        type: String,
    },
    sum: {
        type: Number
    },
    date: {
        type: Date
    },
    buyer: {
        type: String
    },
    pib: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Receipt', Receipt, 'receipts');
//# sourceMappingURL=receipt.js.map