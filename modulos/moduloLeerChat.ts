module.exports = {
    leer : async function(fs) {
            try{
              let contenido:any = await fs.promises.readFile(`./datos/chat.js`,`utf-8`)
               return contenido
            }
            catch{

                console.log([])
                
            }    
       
    }

}