// al añadir esta linea al package.json  "type":"module",

// ya no tengo que poner const express = require('express')

// si no que puedo usar el import normal de jscript


import express from "express"
import dontenv from 'dotenv'
import conectarDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import batchRoutes from './routes/batchRoutes.js'
import chapterRoutes from './routes/chapterRoutes.js'
import budgetRoutes from './routes/budgetRoutes.js'
import cors from 'cors'

const app = express();

dontenv.config()

app.use( express.json())



const dominiosPermitidos = [process.env.FRONTEND_URL]
 
const corsOptions= {
    origin: function (origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1){
            
            callback(null, true)
        }else{
          
            callback(new Error('No permitido por CORS', process.env.FRONTEND_URL ))
        }
    }
}

app.use( cors( corsOptions ) )

app.use('/api/users', userRoutes )
app.use('/api/batchs', batchRoutes )
app.use('/api/chapters', chapterRoutes )
app.use('/api/budgets', budgetRoutes )


// base de datos
conectarDB()

const PORT= process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Servidor online en http://localhost:${PORT}`)
})
