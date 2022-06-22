import * as express from 'express'
import Business from '../models/business';
import User from '../models/user';



export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }


    register = (req: express.Request, res: express.Response)=>{
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


        let business = new Business({username: username, password:password, odgLice: odgLice, phone: phone, email: email, 
            title: title, address: address, pib: pib, matBr: matBr, type:0});

        business.save().then(business=>{
            res.status(200).json({'message': 'user added'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'});
        })
    }
}