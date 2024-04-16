//requires
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


//IMPORTS
const mysql_config=require('./imp/mysql_config');
const functions = require ('./imp/functions');

//variaveis para disponibilidade e para versionamento
const API_AVAILABILITY = true;
const API_VERSION = '1.0.0';

//iniciar o servidor
const app = express();
app.listen(3000,()=>{
    console.log("API está executando")
})

//verificar a disponibilidade da API
app.use((req,res,next)=>{
    if(API_AVAILABILITY){
        next()
    }else{
        res.json(functions.response('atenção','API está em manutenção. Sorry!',0,null))
    }
})

//conexão com mysql
const connection = mysql.createConnection(mysql_config)

//cors
app.use(cors())

//rotas
//rota inicial (entrada)
app.get('/',(req,res)=>{
    res.json(functions.response ('atenção','API está em manutenção. Sorry!',0,null))
})
//endpoint
//rota para a consulta completa
app.get('./tasks',(req,res)=>{
    connection.query('SELECT * FROM tasks',(err,rows)=>{
        if(err){
            res.json(functions.response('sucesso','sucesso na consulta',rows.length,rows))
        }else{
            res.json(functions.response(''))
        }
    })
})

//tratar o erro da rota
app.use((req,res)=>{
    res.use(functions.response('atenção','não encontrado',0,null))
})