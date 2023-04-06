require("dotenv").config()
const { ContenedorArchivo } = require('./controller/contenedorArchivos')
const args= require("minimist")(process.argv.slice(2))
//traigo el link de mongo de .env y lo exporto
const urlMongo=process.env.URL//uso dotenv para guardar el link de la base de datos
 const config={
    puerto:args.p??8080,
    modo:args.m??"fork"
}
//uso minimist para configurar el puerto

const productosA= new ContenedorArchivo("productos")
module.exports={urlMongo,config,productosA}
