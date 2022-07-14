import * as express from 'express'
import business from '../models/business';
import Business from '../models/business';


export class Inventory{
    code: number;
    title: string;
    unit: string;
    tax: number;
    
    producer: string;
    origin: String;
    foreignTitle: String;
    barcode: number;
    customsTax: String;
    ecoTax: String;
    minStock: number;
    maxStock: number;
    description: String;
    declare: String;
    
    getPrice: Array<number>;
    sellPrice: Array<number>;
    lager: Array<number>;
    minStockW: Array<number>;
    maxStockW: Array<number>;
  
    logo:string;
}

export class BusinessController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        business.findOne({'username': username, 'password': password}, (err, business)=>{
            if(err) console.log(err);
            else res.json(business);
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

    searchPIB = (req: express.Request, res: express.Response)=>{
        let pib = req.body.pib;

        Business.findOne({'pib': pib}, (err, business)=>{
            if(err)
                console.log(err)
            else
                res.json(business)
        })
    }

    addOrderer = (req: express.Request, res: express.Response)=>{
        let userDef = req.body.user;
        let orderer = req.body.orderer;

        var flag = 0;

        userDef.orderers.forEach((element: any) => {
            if(element == orderer.pib)
                flag = 1;
        });

        if(flag){
            res.status(200).json({'message': 'existing orderer'});
            return
        }

        Business.findOne({username: userDef.username}, (err, user)=>{
            if(err)
                console.log(err)

            else{
                Business.collection.updateOne({'username': userDef.username}, {$push: 
                    {'orderers': orderer
                }}).then(user=>{
                    res.status(200).json({'message': 'orderer added'});
                }).catch(err=>{
                    res.status(400).json({'message': 'errorAddOrd'});
                })
            }

        })
    }

    updateOrderer = (req: express.Request, res: express.Response)=>{
        let userDef = req.body.user;
        let orderer = req.body.orderer;

        Business.findOne({'username': userDef.username}, (err, business)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(orderer)
                Business.collection.updateOne({'username': userDef.username, 'orderers.pib': orderer.pib}, {$set:
                {'orderers.$.days': orderer.days, 'orderers.$.tax': orderer.tax}}).then(orderer=>{
                    res.status(200).json({'message': 'orderer updated'});
                }).catch(err=>{
                    res.status(400).json({'message': 'errorUpdateOrd'});
                })
            }
        })
    }


    addItem = (req: express.Request, res: express.Response)=>{
        let code = req.body.code;
        let title= req.body. title;
        let unit= req.body.unit;
        let tax= req.body.tax;
        let producer= req.body.producer;
        let origin= req.body.origin;
        let foreignTitle= req.body.foreignTitle;
        let barcode= req.body.barcode;
        let customsTax= req.body.customsTax;
        let ecoTax= req.body.ecoTax;
        let minStock= req.body.minStock;
        let  maxStock= req.body.maxStock;
        let description= req.body.description;
        let declare= req.body.declare;
        let getPrice= req.body.getPrice;
        let sellPrice= req.body.sellPrice;
        let lager= req.body.lager;
        let minStockW= req.body.minStockW;
        let maxStockW= req.body.maxStockW;
        let logo = req.body.logo;
        let userDef = req.body.user;

        var flag = 0;

        userDef.inventory.forEach((element: any)=>{
        if(element.code == code)
            flag = 1;
        })

        if(flag){
            res.status(200).json({'message': 'existing item'});
            return
        }

        var inventory = new Inventory();

        console.log(inventory)

        inventory.code = code
        inventory.title = title
        inventory.unit = unit
        inventory.tax = tax
        inventory.producer = producer
        inventory.origin = origin
        inventory.foreignTitle = foreignTitle
        inventory.barcode = barcode
        inventory.customsTax = customsTax
        inventory.ecoTax = ecoTax
        inventory.minStock = minStock
        inventory.maxStock = maxStock
        inventory.description = description
        inventory.declare = declare
        inventory.getPrice = getPrice
        inventory.sellPrice = sellPrice
        inventory.lager = lager
        inventory.minStockW = minStockW
        inventory.maxStockW = maxStockW
        inventory.logo = logo

        Business.findOne({'username':userDef.username}, (err, user)=>{
            if(err)
                console.log(err)
            else{
                Business.collection.updateOne({'username': userDef.username}, {$push:
                    {

                        'inventory': inventory
                        // 'inventory.code': code,
                        // 'inventory.title': title,
                        // 'inventory.unit': unit,
                        // 'inventory.tax': tax,
                        // 'inventory.producer': producer,
                        // 'inventory.origin': origin,
                        // 'inventory.foreignTitle': foreignTitle,
                        // 'inventory.barcode': barcode,
                        // 'inventory.customsTax': customsTax,
                        // 'inventory.ecoTax': ecoTax,
                        // 'inventory.minStock': minStock,
                        // 'inventory.maxStock': maxStock,
                        // 'inventory.description': description,
                        // 'inventory.declare': declare,
                        // 'inventory.getPrice': getPrice,
                        // 'inventory.sellPrice': sellPrice,
                        // 'inventory.lager': lager,
                        // 'inventory.minStockW': minStockW,
                        // 'inventory.maxStockW': maxStockW,
                        // 'inventory.logo': logo,
                    }
                }).then(user=>{
                    res.status(200).json({'message': 'item added'});
                }).catch(err=>{
                    res.status(400).json({'message': 'errorAddItem'});
                })
            }

        })

    }


    eraseItem = (req: express.Request, res: express.Response)=>{
        let item = req.body.item;
        let username = req.body.username;
        

        Business.collection.updateOne({'username': username},{
            $pull:{
                inventory : {'code': item.code}
            }
        }).then(item=>{
            res.status(200).json({'message': 'item removed'});
        }).catch(err=>{
            res.status(400).json({'message': 'errorRemoveItem'});
        })

    }


    addCategory = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let element = req.body.element;
        let category = req.body.category;

        var c;

        switch(category){
            case("пиће"):
                c = "drink"
            break;
            case("храна"):
                c = "food"
            break;
            case("кетеринг"):
                c = "catering"
            break;
        }

        Business.collection.updateOne({'username': username, 'inventory.code': element.code},{
            $set:{
                'inventory.$.category': c
            }}).then(orderer=>{
                res.status(200).json({'message': 'category updated'});
            }).catch(err=>{
                res.status(400).json({'message': 'errorUpdateCat'});
            })
    }



    addTab = (req: express.Request, res: express.Response)=>{
        let userDef = req.body.user;
        let name = req.body.name;


        Business.findOne({'username':userDef.username}, (err, user)=>{
            if(err)
                console.log(err)
            else{
                Business.collection.updateOne({'username': userDef.username}, {$push:
                    {
                        'tabs': name
                    }
                }).then(ord=>{
                        res.status(200).json({'message': 'tab added'});
                }).catch(err=>{
                        res.status(400).json({'message': 'errorAddTab'});
                })
            }
        })
    }


    removeTab = (req: express.Request, res: express.Response)=>{
        let userDef = req.body.user;
        let index = req.body.index;

        Business.collection.updateOne({'username': userDef.username},{$pull:
            {
                 'tabs': index
            }
        }).then(item=>{
            res.status(200).json({'message': 'tab removed'});
        }).catch(err=>{
            res.status(400).json({'message': 'errorRemoveTab'});
        })
    }


    // getItems = (req: express.Request, res: express.Response)=>{
    //     let userDef = req.body.user;
    //     let id = req.body.skladiste;

    //     Business.collection.find({'username': userDef.username, 'skladista.id' : id}).toArray(function(err, items){
    //         if (err) console.log(err)
    //         else 
    //             res.json(items);

    //     })
    // }

}