import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/realestate2022')
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db ok')
})

const router = express.Router();
router.use('/user', userRouter);

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));