import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import publicRoutes from './routes/public.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/home', publicRoutes);

app.listen(3000, ()=>{
    console.log('Server: 3000')
})

