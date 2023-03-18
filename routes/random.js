const { Router } = require("express")
const routerRandom= Router()
const{fork} = require("child_process")
const forks=fork("./helper/longProcess.js")

routerRandom.get('/randoms/:cant',(req,res)=>{
const cantidad = req.params.cant
forks.send(cantidad)//uso forks para processo no bloqueante
forks.on("message",(message)=>{//padre
    res.end(JSON.stringify(message,null,2))
})

})
routerRandom.get('/randoms',(req,res)=>{
    const cantidad = 1000000
    forks.send(cantidad)
    forks.on("message",(message)=>{
        res.end(`el numero random es ${JSON.stringify(message,null,2)}`)
    })
    
    })


module.exports={routerRandom}
