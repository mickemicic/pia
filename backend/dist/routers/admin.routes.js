"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Business_controller_1 = require("../controllers/Business.controller");
const AdminRouter = express_1.default.Router();
AdminRouter.route('/login').post((req, res) => new Business_controller_1.BusinessController().login(req, res));
exports.default = AdminRouter;
//# sourceMappingURL=admin.routes.js.map