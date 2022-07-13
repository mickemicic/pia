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
BusinessRouter.route('/extraInfo').post((req, res) => new Business_controller_1.BusinessController().extraInfo(req, res));
BusinessRouter.route('/update').post((req, res) => new Business_controller_1.BusinessController().update(req, res));
BusinessRouter.route('/updateAcc').post((req, res) => new Business_controller_1.BusinessController().updateAcc(req, res));
BusinessRouter.route('/updateStorage').post((req, res) => new Business_controller_1.BusinessController().updateStorage(req, res));
BusinessRouter.route('/searchPIB').post((req, res) => new Business_controller_1.BusinessController().searchPIB(req, res));
BusinessRouter.route('/addOrderer').post((req, res) => new Business_controller_1.BusinessController().addOrderer(req, res));
BusinessRouter.route('/updateOrderer').post((req, res) => new Business_controller_1.BusinessController().updateOrderer(req, res));
exports.default = BusinessRouter;
//# sourceMappingURL=business.routes.js.map