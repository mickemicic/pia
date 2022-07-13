import express from 'express';
import { BusinessController } from '../controllers/Business.controller';
const BusinessRouter = express.Router();

BusinessRouter.route('/login').post(
    (req, res)=>new BusinessController().login(req, res)
)

BusinessRouter.route('/register').post(
    (req, res)=>new BusinessController().register(req, res)
)

BusinessRouter.route('/search').post(
    (req, res)=>new BusinessController().search(req, res)
)

BusinessRouter.route('/searchMail').post(
    (req, res)=>new BusinessController().searchMail(req, res)
)

BusinessRouter.route('/extraInfo').post(
    (req, res)=>new BusinessController().extraInfo(req, res)
)

BusinessRouter.route('/update').post(
    (req, res)=>new BusinessController().update(req, res)
)

BusinessRouter.route('/updateAcc').post(
    (req, res)=>new BusinessController().updateAcc(req, res)
)

BusinessRouter.route('/updateStorage').post(
    (req, res)=>new BusinessController().updateStorage(req, res)
)

BusinessRouter.route('/searchPIB').post(
    (req, res)=>new BusinessController().searchPIB(req, res)
)

BusinessRouter.route('/addOrderer').post(
    (req, res)=>new BusinessController().addOrderer(req, res)
)

BusinessRouter.route('/updateOrderer').post(
    (req, res)=>new BusinessController().updateOrderer(req, res)
)

export default BusinessRouter;