import express from 'express';
import { BusinessController } from '../controllers/Business.controller';
const AdminRouter = express.Router();

AdminRouter.route('/login').post(
    (req, res)=>new BusinessController().login(req, res)
)

export default AdminRouter;