const log4js=require("log4js")

log4js.configure({//creamos los tipos de loggers
    appenders:{
     console:{type:"console"},
     consoleLogger:{type:"logLevelFilter",appender:"console",level:"info"},
     
     warningFile:{type:"file",filename:"warning.log"},
     warningFileLogger:{type:"logLevelFilter",appender:"warningFile",level:"warning"},
      
     errorFile:{type:"file",filename:"error.log"},
     errorFileLogger:{type:"logLevelFilter",appender:"errorFile",level:"error"}, 
    },
    categories:{
        default:{
            appenders:["consoleLogger","warningFileLogger","errorFileLogger"],
            level:"all",
        }
    }
    

})
const logger=log4js.getLogger()
module.exports=logger