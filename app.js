require('dotenv').config({path: './config.env'});
const express = require("express");
const { sequelize } = require('./models');
const index = require("./routers");
const app = express();

app.use(express.json())

const port = process.env.PORT;

db_init = async function main(){
   //await sequelize.sync({alter:true})
    await sequelize.authenticate()
    console.log("table initialized")
}

app.use('/api/v1/', index);

app.get('/',(req,res)=>{
    return res.status(200).json({
      message: 'stackoverflow_lite API',
    })
  })

app.listen(port, ()=>{
    db_init(),
    console.log(`server started on port: ${port}`)
})

