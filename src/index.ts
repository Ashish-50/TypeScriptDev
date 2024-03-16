import express, {Application,NextFunction,Request,Response} from 'express';
import { ORIGIN, PORT } from './config/config';
import cors from 'cors';
import './db'
import Userrouter from './routes/user.route';
import { ErrorMiddleware } from './middleware/error.middleware';
import toDorouter from './routes/toDo.route';


const app: Application = express();
const port:number = Number(PORT) || 3000;

app.use(cors({origin:ORIGIN,credentials:true}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/health',(req:Request, res:Response)=>{
    res.send({
        state:'ready',
    })
})

app.use('/api', Userrouter);
app.use("/todo", toDorouter);

app.use(ErrorMiddleware)
try {
    app.listen(port,()=>{
        console.info(`======================`);
        console.info(`App is listing at port ${port}`);
        console.info(`======================`);
    })
} catch (error) {
    console.log(error)
}