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

export default BusinessRouter;