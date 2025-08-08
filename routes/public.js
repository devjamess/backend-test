import express from 'express'
import supabase from '../supabase.js'

const route = express.Router();


route.post('/login', async (req, res) => {
    const { matricula, senha } = req.body;
    try{

        const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('matricula', matricula)
        .eq('senha', senha)
        .single()

        if(error) {
            console.error('Erro ao encontrar usuário:', error);
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        return res.status(200).json(data);

    }catch(error){
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Erro ao fazer login' });
    }

});



route.post('/register', async (req, res)=>{
    const {matricula, nome, senha, email } = req.body;
   

    try{
        const {data, error} = await supabase
        .from('users')
        .insert([{
            matricula, 
            nome, 
            senha,
            email,
    }]) 
        .select()

        if(error) {
           
            return res.status(400).json({ message: 'Erro ao inserir dados' });
        }
    
        console.log(data)
        res.status(200).json({ message: 'resgistrado'})
    
    } catch(error){
        
        return res.status(500).json({message:'Erro ao resgistrar'})
    }
});


route.post('/find-email', async (req, res) => {
  const { email } = req.body;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('matricula, id, nome, email')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(200).json({ exists: false });
    }

    return res.status(200).json({
      exists: true,
      user: data,
    });

  } catch (error) {
    return res.status(500).json({ exists: false });
  }
});



route.get('/test-user', async (req, res) => {
    try {
        const {data, error} = await supabase
        .from('users')
        .select('*')

        return res.status(200).json(data);

    }
    catch(error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Erro ao buscar usuários' });
    }

});

export default route;