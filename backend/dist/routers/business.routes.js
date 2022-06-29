"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Business_controller_1 = require("../controllers/Business.controller");
const BusinessRouter = express_1.default.Router();
BusinessRouter.route('/login').post((req, res) => new Business_controller_1.BusinessController().login(req, res));
BusinessRouter.route('/register').post((req, res) => new Business_controller_1.BusinessController().register(req, res));
BusinessRouter.route('/search').post((req, res) => new Business_controller_1.BusinessController().search(req, res));
BusinessRouter.route('/searchMail').post((req, res) => new Business_controller_1.BusinessController().searchMail(req, res));
exports.default = BusinessRouter;
//# sourceMappingURL=business.routes.js.map