"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessController = void 0;
const business_1 = __importDefault(require("../models/business"));
const business_2 = __importDefault(require("../models/business"));
class BusinessController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            business_1.default.findOne({ 'username': username, 'password': password }, (err, business) => {
                if (err)
                    console.log(err);
                else
                    res.json(business);
            });
        };
        this.register = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let type = -1;
            let odgLice = req.body.odgLice;
            let phone = req.body.phone;
            let email = req.body.email;
            let title = req.body.title;
            let address = req.body.address;
            let pib = req.body.pib;
            let matBr = req.body.matBr;
            let logo = req.body.logo;
            // let file = req.body.file;
            // console.log(file + "hehe");
            // console.log(logo);
            // let base64 = file.toString('base64');
            // let buff = new Buffer(base64, 'base64');
            // let bitmap = fs.readFileSync(file);
            // let buff = new Buffer(bitmap).toString('base64');
            // if(User.findOne({'username': username})){
            //     res.status(400).json({'message': 'existing'});
            //     return;
            // }
            let business = new business_2.default({ username: username, password: password, odgLice: odgLice, phone: phone, email: email,
                title: title, address: address, pib: pib, matBr: matBr, type: type, logo: logo });
            business.save().then(business => {
                res.status(200).json({ 'message': 'user added' });
            }).catch(err => {
                res.status(400).json({ 'message': 'errorReg' });
            });
        };
        this.search = (req, res) => {
            let username = req.body.username;
            business_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.searchMail = (req, res) => {
            let email = req.body.email;
            business_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.extraInfo = (req, res) => {
            let username = req.body.username;
            let category = req.body.category;
            let activities = req.body.activities;
            let pdv = req.body.pdv;
            let accNum = req.body.accNum;
            let kaseL = req.body.kaseL;
            let kaseT = req.body.kaseT;
            let skladistaId = req.body.skladistaId;
            let skladistaNaz = req.body.skladistaNaz;
            business_2.default.findOne({ username: username }, (err, business) => {
                if (err) {
                    console.log(err);
                }
                else {
                    business_2.default.collection.updateOne({ 'username': username }, { $set: { 'category': category,
                            'activities': activities,
                            'accNum': accNum,
                            'pdv': pdv,
                            'type': 1,
                            'kase.lokacija': kaseL,
                            'kase.tip': kaseT,
                            'skladista.id': skladistaId,
                            'skladista.naziv': skladistaNaz
                        } }).then(business => {
                        res.status(200).json({ 'message': 'data updated' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'error' });
                    });
                }
            });
        };
        this.update = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            let odgLice = req.body.odgLice;
            let phone = req.body.phone;
            business_2.default.findOne({ username: username }, (err, business) => {
                if (err) {
                    console.log(err);
                }
                else {
                    business_2.default.collection.updateOne({ 'username': username }, { $set: { 'email': email,
                            'odgLice': odgLice,
                            'phone': phone
                        } }).then(business => {
                        res.status(200).json({ 'message': 'user updated' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'errorUpdate' });
                    });
                }
            });
        };
        this.updateAcc = (req, res) => {
            let accNum = req.body.accNum;
            let username = req.body.username;
            business_2.default.findOne({ username: username }, (err, business) => {
                if (err) {
                    console.log(err);
                }
                else {
                    business_2.default.collection.updateOne({ 'username': username }, { $set: { 'accNum': accNum
                        } }).then(business => {
                        res.status(200).json({ 'message': 'acc updated' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'errorUpdateAcc' });
                    });
                }
            });
        };
        this.updateStorage = (req, res) => {
            let kaseL = req.body.kaseL;
            let kaseT = req.body.kaseT;
            let skladistaId = req.body.skladistaId;
            let skladistaNaz = req.body.skladistaNaz;
            let username = req.body.username;
            business_2.default.findOne({ username: username }, (err, business) => {
                if (err) {
                    console.log(err);
                }
                else {
                    business_2.default.collection.updateOne({ 'username': username }, { $set: { 'skladista.id': skladistaId,
                            'skladista.naziv': skladistaNaz,
                            'kase.lokacija': kaseL,
                            'kase.tip': kaseT
                        } }).then(business => {
                        res.status(200).json({ 'message': 'storage updated' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'errorUpdateAcc' });
                    });
                }
            });
        };
        this.searchPIB = (req, res) => {
            let pib = req.body.pib;
            business_2.default.findOne({ 'pib': pib }, (err, business) => {
                if (err)
                    console.log(err);
                else
                    res.json(business);
            });
        };
        this.addOrderer = (req, res) => {
            let userDef = req.body.user;
            let orderer = req.body.orderer;
            var flag = 0;
            userDef.orderers.forEach((element) => {
                if (element == orderer.pib)
                    flag = 1;
            });
            if (flag) {
                res.status(200).json({ 'message': 'existing orderer' });
                return;
            }
            business_2.default.findOne({ username: userDef.username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    business_2.default.collection.updateOne({ 'username': userDef.username }, { $push: { 'orderers': orderer
                        } }).then(user => {
                        res.status(200).json({ 'message': 'orderer added' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'errorAddOrd' });
                    });
                }
            });
        };
        this.updateOrderer = (req, res) => {
            let userDef = req.body.user;
            let orderer = req.body.orderer;
            business_2.default.findOne({ 'username': userDef.username }, (err, business) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(orderer);
                    business_2.default.collection.updateOne({ 'username': userDef.username, 'orderers.pib': orderer.pib }, { $set: { 'orderers.$.days': orderer.days, 'orderers.$.tax': orderer.tax } }).then(orderer => {
                        res.status(200).json({ 'message': 'orderer updated' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'errorUpdateOrd' });
                    });
                }
            });
        };
    }
}
exports.BusinessController = BusinessController;
//# sourceMappingURL=Business.controller.js.map