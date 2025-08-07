import express from 'express'
import supabase from '../supabase.js'

const route = express.Router();

route.post('/register', async (req, res)=>{
    const {matricula, nome, senha } = req.body;
   

    try{
        const {data, error} = await supabase
        .from('users')
        .insert([{
            matricula, nome, senha
    }])
        .select()
        .single()

        if(error) {
            console.error('Error inserting data:', error);
            return res.status(400).json({ message: 'Erro ao inserir dados' });
        }
    
        console.log(data)
        res.status(200).json({ message: 'resgistrado'})
    
    } catch(error){
        console.error('Error during registration:', error);
        return res.status(500).json({message:'Erro ao resgistrar'})
    }
});

export default route;