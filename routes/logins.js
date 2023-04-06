const { Router } = require("express")
const passport=require("passport")
const logger = require("../config/loggers")
const compression=require("compression")
const { productosA } = require("../config/enviorment")
const routerLogins= Router()
const numCpus=require("os").cpus().length


routerLogins.get('/datos',async (req,res)=>{
    if(req.session.username){
    //const produc=await productosDao.getAll()
    const produc=await productosA.getAll()
    const nombre=req.session.username
    res.render('form.ejs',{produc,nombre})
    return  
    }
    res.redirect("/login.html")
})
routerLogins.get("/info",compression(),(req,res)=>{
    let path=process.argv[1]
    let processId=process.pid
    let node=process.version
    let os=process.platform
    let memoria=process.memoryUsage()
    let carpetaProyecto=process.cwd()
    let procesadores=numCpus
    const datos={
        pathEjecucion:path,
        Process:processId,
        versionNode:node,
        sistemaOperativo:os,
        procesadores,
        memoriaTotal:memoria,
        carpetaDelProyecto:carpetaProyecto
    }
    res.send(JSON.stringify(datos,null,2))
})

routerLogins.post('/signup',passport.authenticate("signup",{failureRedirect:"login.html"}),async (req,res)=>{
   req.session.username=req.user.username
  res.redirect("/datos")
})

routerLogins.post('/login',passport.authenticate("login",{failureRedirect:"/login.html"}), async (req,res)=>{
    req.session.username=req.user.username
    
    
  
    res.redirect("/datos")
})

routerLogins.get("/logout",async(req,res)=>{
    req.session.destroy(()=>{
        res.send("hasta luego")
    })
})
routerLogins.get("*",(req,res)=>{
    const {url,method}=req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no implementada`)
})

module.exports={routerLogins}