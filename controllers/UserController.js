
import bcrypt from 'bcryptjs'
import generarJWT from "../helpers/jwt.js"
import generarId from "../helpers/generarId.js"
import User from "../models/UserModel.js"
import { emailRegistro, resetPassword } from '../helpers/emails.js'


const register = async ( req, res )=>{

   const { email, password } = req.body 
   let user = await User.findOne({ email })

   // prevenir un usuario duplicado

   if( user ){
       return res.status(401).json({ msg: 'This user already exists'}) 
   };

   try {

    // guardar un nuevo usuario

    user = new User( req.body )

    // hashear password, se puede así, pero se puede hacer en el model. (ver en UserModel.js)
    // const salt = bcrypt.genSaltSync()
    // user.password = bcrypt.hashSync(password, salt)
    
    const userGuardado = await user.save()
    
    //enviar correo de confirmacion con el token unico
    await emailRegistro( userGuardado)
   
    return res.status(200).json({ msg:'Saved user', userGuardado })
  
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:error.message})
    }
  
  
    
 }

const perfil = async ( req, res )=>{

    try {    
      return res.status(200).json( {perfil: req.user })
    } catch (error) {
      console.log(error) 
      return res.status(500).json({msg: error.message})
    }

    
 } 



const confirmar = async ( req, res ) =>{

    const { token } = req.params
    const usuarioAConfirmar = await User.findOne({ token })
    
    if (!usuarioAConfirmar) {
        const error= new Error('User not found')
        return res.status(404).json({ msg: error.message})
    }

    try {
        usuarioAConfirmar.token = null;
        usuarioAConfirmar.confirmado = true;
        await usuarioAConfirmar.save()
        return res.status(200).json({msg: 'User successfully confirmed'})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'There was an error'})
    }

    
    
}
const autenticar = async (req, res) =>{

    const { email, password } = req.body
    
    try {
        // comprobar si existe el usuario 

        const user = await User.findOne({ email })
        if (!user) {
            const error= new Error('This user not exists')
            return res.status(404).json({ msg: error.message})
            }

        // comprobar si esta confirmado el usuario

        if (!user.confirmado) {
            const error = new Error('Account not confirmed, please check your inbox')
            return res.status(401).json({msg: error.message})        
            }

        // Revisar password de dos maneras

        const validPassword = await bcrypt.compare( password, user.password) // aqui lo comparo directamente con bcrypt
        
        if( await user.comprobarPassword(password)){  // en este bloque if untilizo el metodo instanciado en el modelo para comprobar el pass
            console.log('password correto')
        }else{
            console.log('password incorrecto')
        }

        if(!validPassword){
            const error = new Error('Incorrect username or password')
            return res.status(401).json({msg: error.message})
        }

        const token = generarJWT(user._id, user.nombre)
        
        return res.status(200).json({ok:'true', token, user: user.nombre, userEmail: user.email, _id:user._id})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'There was an error'})
    }
}
const olvidePassword = async ( req, res ) =>{
    const{ email } = req.body
   
    const existeUser = await User.findOne({ email })

    
    if( !existeUser ){
        const error = new Error('User not found')
        return res.status(404).json({msg:error.message})
    }
    try {
        existeUser.token = generarId()
        await existeUser.save()
       
        await resetPassword( existeUser )
        return res.status(200).json({msg: 'Check your inbox and follow the instructions'})


    } catch (error) {
        console.log(error)
    }
};


const comprobarToken = async ( req, res ) =>{

    const { token } = req.params;
    const tokenValido = await User.findOne({ token })

    if( tokenValido ) {
        // El token es válido y el usuario existe 
        res.status(200).json({msg:'Token válid and the user exists'})
    } else {
        const error = new Error('Token not valid')
        res.status(400).json({msg:error.message})
    }
    
};


const nuevoPassword = async ( req, res ) =>{
   const { token } = req.params
   const { password } = req.body

   const user = await User.findOne({ token })

   if( !user ) {
    const error = new Error('There was an error')
    return res.status(400).json({msg: error.message})
   }
   try {
       user.password = password
       user.token = null
       await user.save();
       res.status(200).json({msg:'Password successfully updated'})   
   } catch (error) {
    const e = new Error('There was an error ')
    return res.status(400).json({msg: e.message})
    
   }
};

 export {
    register,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
 }