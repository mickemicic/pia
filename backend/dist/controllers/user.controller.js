"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const business_1 = __importDefault(require("../models/business"));
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let odgLice = req.body.odgLice;
            let username = req.body.username;
            let password = req.body.password;
            let passwordConfirm = req.body.passwordConfirm;
            let phone = req.body.phone;
            let email = req.body.email;
            let title = req.body.title;
            let address = req.body.address;
            let pib = req.body.pib;
            let matBr = req.body.matBr;
            let business = new business_1.default({ username: username, password: password, odgLice: odgLice, phone: phone, email: email,
                title: title, address: address, pib: pib, matBr: matBr, type: 0 });
            business.save().then(business => {
                res.status(200).json({ 'message': 'user added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map