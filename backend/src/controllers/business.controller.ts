import * as express from 'express'
import business from '../models/business';
import Business from '../models/business';



export class BusinessController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        business.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }


    register = (req: express.Request, res: express.Response)=>{
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

        let business = new Business({username: username, password: password, odgLice: odgLice, phone: phone, email: email, 
            title: title, address: address, pib: pib, matBr: matBr, type: type, logo: logo});

        business.save().then(business=>{
            res.status(200).json({'message': 'user added'});
        }).catch(err=>{
            res.status(400).json({'message': 'errorReg'});
        })
    }

    search = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        business.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    searchMail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        business.findOne({'email': email}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })

    }

    extraInfo = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        let category = req.body.category;
        let activities = req.body.activities;
        let pdv = req.body.pdv;
        let accNum = req.body.accNum;
        let kaseL = req.body.kaseL;
        let kaseT = req.body.kaseT;
        let skladistaId = req.body.skladistaId;
        let skladistaNaz = req.body.skladistaNaz;
        

        Business.findOne({username: username}, (err, business)=>{
            if(err){ 
                console.log(err);
            }
            else{
                Business.collection.updateOne({'username': username}, {$set: 
                    {'category': category, 
                    'activities': activities,
                    'accNum': accNum,
                    'pdv': pdv,
                    'type': 1,
                    'kase.lokacija': kaseL,
                    'kase.tip': kaseT,
                    'skladista.id': skladistaId,
                    'skladista.naziv': skladistaNaz
                }}).then(business=>{
                    res.status(200).json({'message': 'data updated'});
                }).catch(err=>{
                    res.status(400).json({'message': 'error'});
                })
                
            }
        })
    }

    update = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let email = req.body.email;
        let odgLice = req.body.odgLice;
        let phone = req.body.phone;

        Business.findOne({username: username}, (err, business)=>{
            if(err){ 
                console.log(err);
            }
            else{
                Business.collection.updateOne({'username': username}, {$set: 
                    {'email' : email,
                    'odgLice': odgLice,
                    'phone': phone
                }}).then(business=>{
                    res.status(200).json({'message': 'user updated'});
                }).catch(err=>{
                    res.status(400).json({'message': 'errorUpdate'});
                })
                
            }
        })
    }

    updateAcc = (req: express.Request, res: express.Response)=>{
        let accNum = req.body.accNum;
        let username = req.body.username;

        Business.findOne({username: username}, (err, business)=>{
            if(err){ 
                console.log(err);
            }
            else{
                Business.collection.updateOne({'username': username}, {$set: 
                    {'accNum': accNum
                }}).then(business=>{
                    res.status(200).json({'message': 'acc updated'});
                }).catch(err=>{
                    res.status(400).json({'message': 'errorUpdateAcc'});
                })
                
            }
        })
    }


    updateStorage = (req: express.Request, res: express.Response)=>{
        let kaseL = req.body.kaseL;
        let kaseT = req.body.kaseT;
        let skladistaId = req.body.skladistaId;
        let skladistaNaz = req.body.skladistaNaz;
        let username = req.body.username;

        Business.findOne({username: username}, (err, business)=>{
            if(err){ 
                console.log(err);
            }
            else{
                Business.collection.updateOne({'username': username}, {$set: 
                    {'skladista.id': skladistaId,
                    'skladista.naziv': skladistaNaz,
                    'kase.lokacija': kaseL,
                    'kase.tip': kaseT
                }}).then(business=>{
                    res.status(200).json({'message': 'storage updated'});
                }).catch(err=>{
                    res.status(400).json({'message': 'errorUpdateAcc'});
                })
                
            }
        })
    }


}