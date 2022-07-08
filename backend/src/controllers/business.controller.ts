import * as express from 'express'
import business from '../models/business';
import Business from '../models/business';
import User from '../models/user';



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
        

        // if(User.findOne({'username': username})){
        //     res.status(400).json({'message': 'existing'});
        //     return;
        // }

        let business = new Business({username: username, password: password, odgLice: odgLice, phone: phone, email: email, 
            title: title, address: address, pib: pib, matBr: matBr, type: type});

        business.save().then(business=>{
            res.status(200).json({'message': 'user added'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'});
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
        
        Business.findOne({username: username}, (err, user)=>{
            if(err){ 
                console.log(err);
            }
            else{
                Business.collection.updateOne({'username': username}, {$push: 
                    {'category': category, 
                    'activities': activities,
                    'accNum': accNum,
                    'pdv': pdv,
                    'type': 1
                }}).then(business=>{
                    res.status(200).json({'message': 'data updated'});
                }).catch(err=>{
                    res.status(400).json({'message': 'error'});
                })
                
            }
        })
    }
}