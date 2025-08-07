import express from 'express'
import supabase from '../supabase.js'

const route = express.Router();

route.post('/register', async (req, res)=>{
    const {matricula, nome, senha } = req.body;
    res.status(200).json({ message: 'Route register - sucess'})

    try{
        async function createUser(){
        const { user } = await supabase
        .from('users')
        .insert([
            matricula, nome, senha
        ])

        console.log(user)
        res.status(200).json({ message: 'resgistrado'})
    }
   createUser();
    
    } catch(error){
        res.status(500).json({message:'Erro ao resgistrar'})
    }
});

export default route;